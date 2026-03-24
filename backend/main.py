#!/usr/bin/env python3
"""
《古董局中局》百科 API 服务器
FastAPI + SQLite 实现的轻量级后端
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pathlib import Path
from typing import List, Dict, Any
import json

app = FastAPI(
    title="《古董局中局》百科 API",
    description="沉浸式《古董局中局》互动信息聚合站 API",
    version="1.0.0"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Vite 开发服务器地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据库路径
DB_PATH = Path(__file__).parent / "database.db"

def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # 返回字典形式的结果
    return conn

@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "《古董局中局》百科 API",
        "version": "1.0.0",
        "endpoints": {
            "characters": "/api/characters",
            "antiques": "/api/antiques"
        }
    }

@app.get("/api/characters")
async def get_characters():
    """获取所有角色数据"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM characters ORDER BY name")
        rows = cursor.fetchall()

        # 将 Row 对象转换为字典列表
        characters = [dict(row) for row in rows]

        conn.close()
        return {"data": characters}

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"数据库错误: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器错误: {str(e)}")

@app.get("/api/antiques")
async def get_antiques():
    """获取所有古董数据"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM antiques ORDER BY name")
        rows = cursor.fetchall()

        # 将 Row 对象转换为字典列表，并解析 metadata JSON
        antiques = []
        for row in rows:
            antique_dict = dict(row)
            if antique_dict['metadata']:
                antique_dict['metadata'] = json.loads(antique_dict['metadata'])
            antiques.append(antique_dict)

        conn.close()
        return {"data": antiques}

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"数据库错误: {str(e)}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"JSON 解析错误: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器错误: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )