
# 使用Python作为基础镜像
FROM python:3.9
# 设置工作目录
WORKDIR /app
# 复制应用代码到容器中
COPY . /app
# 创建目录
RUN mkdir -p /app/后端/static
# 下载静态文件到容器中
RUN wget -O /app/后端/static/dist.zip https://gitee.com/cylkcode/nku-vue-blog/releases/download/1.0/dist.zip
# 解压静态文件
RUN unzip /app/后端/static/dist.zip -d /app/后端/static
# 将dist文件夹内的文件移动到static文件夹内
RUN mv /app/后端/static/dist/* /app/后端/static
# 删除dist文件夹
RUN rm -rf /app/后端/static/dist
# 更新pip
RUN pip install --upgrade pip
# 安装依赖项
RUN pip install --no-cache-dir -r ./后端/requirements.txt
# 暴露应用端口
EXPOSE 7921
# 进入后端目录
WORKDIR /app/后端

# 设置启动命令
CMD ["python", "main.py"]