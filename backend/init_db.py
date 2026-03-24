#!/usr/bin/env python3
"""
数据库初始化脚本
从 metadata.json 导入数据并写入 SQLite 数据库（支持幂等操作）
"""

import json
import sqlite3
from pathlib import Path

def init_database():
    """初始化数据库"""
    # 数据库文件路径
    db_path = Path(__file__).parent / "database.db"

    # 删除现有数据库文件（幂等操作）
    if db_path.exists():
        db_path.unlink()
        print(f"已删除现有数据库: {db_path}")

    # 读取 JSON 数据文件
    json_path = Path(__file__).parent.parent / "metadata.json"

    if not json_path.exists():
        raise FileNotFoundError(f"数据文件不存在: {json_path}")

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 连接数据库
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # 创建 characters 表
        cursor.execute('''
            CREATE TABLE characters (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                title TEXT NOT NULL,
                tag TEXT,
                description TEXT,
                quote TEXT,
                faction TEXT CHECK(faction IN ('五脉', '老朝奉', '其他')),
                color TEXT,
                image TEXT
            )
        ''')

        # 创建 antiques 表
        cursor.execute('''
            CREATE TABLE antiques (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                era TEXT,
                description TEXT,
                story TEXT,
                image TEXT,
                metadata TEXT
            )
        ''')

        # 插入角色数据
        characters_data = data['characters']
        for char in characters_data:
            cursor.execute('''
                INSERT INTO characters (id, name, title, tag, description, quote, faction, color, image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                char['id'],
                char['name'],
                char['title'],
                char['tag'],
                char['description'],
                char['quote'],
                char['faction'],
                char['color'],
                char['image']
            ))

        # 插入古董数据
        antiques_data = data['antiques']
        for antique in antiques_data:
            # metadata 是 dict，需要转为 JSON 字符串
            metadata_json = json.dumps(antique['metadata'])

            cursor.execute('''
                INSERT INTO antiques (id, name, era, description, story, image, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                antique['id'],
                antique['name'],
                antique['era'],
                antique['description'],
                antique['story'],
                antique['image'],
                metadata_json
            ))

        # 提交事务
        conn.commit()
        print(f"数据库初始化成功！")
        print(f"- 导入了 {len(characters_data)} 个角色")
        print(f"- 导入了 {len(antiques_data)} 个古董")

    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

if __name__ == "__main__":
    init_database()