# 使用Python 3.12 slim镜像
FROM python:3.12-slim

WORKDIR /app

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 【修复路径】指明从 backend 文件夹中复制
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 【修复路径】复制 backend 目录下的所有代码
COPY backend/ .

# 复制位于根目录的数据文件
COPY metadata.json .

# 启动应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]