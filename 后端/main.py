import requests
from flask import Flask, request, jsonify
import datetime
from flask_jwt_extended import create_access_token,JWTManager, get_jwt_identity, jwt_required, get_jwt
from os import path
import sqlite3
from flask_cors import CORS
import random
import itertools
import base64
import json

# 生成随机数
def createRandomInt(length, tableName):
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    if tableName == 'users':
        table = 'users'
        id = 'userId'
    elif tableName == 'articles':
        table = 'articles'
        id = 'articleId'

    while True:
        randomInt = random.randint(0, 10**length)
        cursor.execute(f'select count(*) from {table} where {id} = {randomInt}')
        if cursor.fetchone()[0] == 0:
            return randomInt
    db.close()

# 连接数据库
def connectSql():
    db = sqlite3.connect('db.sqlite')
    global cursor
    cursor = db.cursor()

# 初始化数据库
def initSql():
    # 判断是否存在数据库
    db_path = path.join(path.dirname(__file__), 'db.sqlite')
    if not path.exists(db_path):
        print('初始化数据库')
        # 创建数据库
        open(db_path, 'w').close()
        print('创建数据库成功')
        # 连接数据库
        connectSql()
        # 创建表
        with open(path.dirname(__file__)+'/sqlScript/initTable.sql', 'r', encoding='utf8') as f:
            sql = f.read()
            cursor.executescript(sql)

    else:
        print('数据库已存在')
        # 如果数据库中没有对应的表，则创建表
        connectSql()


def main():
    initSql()


# 验证用户
def verifyUser(userName, userPassword):
    # 连接数据库
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    # 查询用户是否存在
    cursor.execute(f'select count(*) from users where userName = "{userName}"')
    if cursor.fetchone()[0] == 0:
        return False
    # 查询密码是否正确
    cursor.execute(f'select count(*) from users where userName = "{userName}" and userPassword = "{userPassword}"')
    if cursor.fetchone()[0] == 0:
        return False
    # 查询用户id
    cursor.execute(f'select userId from users where userName = "{userName}"')
    userId = cursor.fetchone()[0]
    return True, userId



app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'sdfdsfdsf'
jwt = JWTManager()
jwt.init_app(app)

@app.route('/login', methods=['POST'])
def login():
    userName = request.json.get('userName')
    userPassword = request.json.get('userPassword')

    if userName == None or userPassword == None:
        return '参数错误', 400
    stats, id = verifyUser(userName, userPassword)
    if stats:
        # 设置token
        access_token = create_access_token(identity=id)


        return jsonify(data={
            'message': '登录成功',
            'token': access_token
        })
    else:
        return '登录失败', 400

@app.route('/getUserList')
def getUserList():
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    # cursor.execute('select userName,userId from users')
    cursor.execute('select userName,userId,photo,(select count(*) from articles where articles.authorId = users.userId) as articleCount from users order by articleCount desc')
    data = cursor.fetchall()
    db.close()

    # 构建返回值json数组
    res = []
    for item in data:

        res.append({'userName': item[0], 'userId': item[1], 'articleCount': item[3], 'avatar': item[2]})
    
    # 状态码设置

    return res, 200

# 获取用户文章列表
@app.route('/getUserArticle')
def getUserArticle():

    authorId = request.args.get('userId')
    
    if authorId == None:
        return '参数错误', 400
    
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()

    

    # 判断用户是否存在
    if cursor.execute(f'select count(*) from users where authorId = {authorId}').fetchone()[0] == 0:
        db.close()
        return '用户不存在', 400
    
    cursor.execute(f'select articleId, authorId, articletitle from articles where authorId = {authorId}')
    data = cursor.fetchall()
    db.close()
    
    res = []
    for item in data:

        res.append({'articleId': item[0], 'userId': item[1], 'content': item[2]})
    
    # 状态码设置

    return res, 200

# 设置或注册用户
@app.route('/setUser', methods=['POST'])
@jwt_required(optional=True)
def setUser():
    # post请求
    userName = request.json.get('userName')
    userPassword = request.json.get('userPassword')
    userId = request.json.get('userId')

    # 获取token
    token = request.headers.get('Authorization')

    if((userName == None or userName=='') and (userPassword == None or userPassword=='') and (userId == None or userId=='')):
        return '参数错误', 400
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()

    userId = None

    if token == None and userId == None or userId == '':
        #新增用户
        #判断用户是否存在
        cursor.execute(f'select count(*) from users where userName = "{userName}"')
        if cursor.fetchone()[0] != 0:
            return '用户已存在', 400
        #生成用户id
        userId = createRandomInt(6, 'users')
        cursor.execute(f'insert into users(userId, userName, userPassword) values({userId}, "{userName}", "{userPassword}")')
    else:
        #修改用户
        #验证用户

        if(token == None):
            return '未登录', 400
        
        # 验证用户


        userId = get_jwt_identity()

        if str(userId) != request.json.get('userId'):
            return '无权限', 400
        
    # 构建需要修改的数据

    res = []
    for item in request.json:
        if request.json.get(item) != None and item != 'userId':
            # 如果是label，把列表组成字符串
            if item == 'label':
                list_data = request.json.get(item)
                res.append([item, ','.join(list_data)])

            elif item == 'wechat':
                wechat = request.json.get(item)
                res.append(['wechat_id', wechat.get('id')])
                res.append(['wechat_qrCode', wechat.get('qrCode')])
            else:
                res.append([item, request.json.get(item)])

    # # 修改数据   
    for item in res:

        cursor.execute(f'update users set {item[0]} = "{item[1]}" where userId = {userId}')
    db.commit()
    

    return '成功', 200


# 获取用户信息
@app.route('/getUserInfo', methods=['GET'])
def getUserInfo():
    userId = request.args.get('userId')
    if userId == None:
        return '参数错误', 400
    
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    # 判断用户是否存在
    if cursor.execute(f'select count(*) from users where userId = {userId}').fetchone()[0] == 0:
        return '用户不存在', 400
    
    cursor.execute(f'select userName, userId, photo, label, address, mail, github, wechat_id, wechat_qrCode from users where userId = {userId}')
    data = cursor.fetchall()
    db.close()
    data[0] = list(data[0])
    for i in range(len(data[0])):
        if data[0][i] is None:
            data[0][i] = ''
    res = []

    lable = data[0][3].split(',')
    wechat = {
        'id': data[0][7],
        'qrCode': data[0][8]
    }
    item = data[0]
    res.append({'userName': item[0], 'userId': item[1], 'photo': item[2], 'label': lable, 'address': item[4], 'mail': item[5], 'github': item[6], 'wechat': wechat})
        

    
    # 状态码设置

    return res, 200
# 获取文章
@app.route('/getArticle', methods=['GET'])
def getArticle():
    articleId = request.args.get('articleId')
    if articleId == None:
        return '参数错误', 400
    
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    # 判断用户是否存在
    if cursor.execute(f'select count(*) from articles where articleId = {articleId}').fetchone()[0] == 0:
        return '文章不存在', 400
    
    cursor.execute(f'select articleTitle, authorname, authorId, articleText  from articles join users on articles.authorId = users.userId where articleId = {articleId}')
    data = cursor.fetchall()
    db.close()
    
    res = []
    for item in data:

        res.append({'articleTitle': item[0], 'authorName': item[1], 'authorId': item[2], 'articleText': item[3]})
    
    # 状态码设置

    return res, 200

# 发布或修改文章或删除
@app.route('/setArticle', methods=['POST'])
@jwt_required(optional=True)
def setArticle():
    # post请求
    articleTitle = request.json.get('articleTitle')
    articleText = request.json.get('articleText')
    articleId = request.json.get('articleId')

    # 获取token
    token = request.headers.get('Authorization')
    userId = get_jwt_identity()

    if (articleId == None or articleId == '') and articleTitle != (None or '') and articleText != (None or ''):
        # 新增文章
        # 生成文章id
        if articleTitle == None or articleText == None:
            return '参数错误', 400
        # 生成时间
        dateTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        articleId = createRandomInt(6, 'articles')
        db = sqlite3.connect('db.sqlite')
        cursor = db.cursor()
        cursor.execute(f'insert into articles(articleId, articleTitle, articleText, authorId, date) values({articleId}, "{articleTitle}", "{articleText}", {userId}, "{dateTime}")')

    elif articleText == None:
        # 删除文章
    
        db = sqlite3.connect('db.sqlite')
        cursor = db.cursor()
        # 判断用户权限
        cursor.execute(f'select authorId from articles where articleId = {articleId}')
        if cursor.fetchone()[0] != userId:
            return '无权限', 400
        cursor.execute(f'delete from articles where articleId = {articleId}') 

    elif (articleTitle != None or articleText != None) and articleId != None:
        
        # 修改文章
        db = sqlite3.connect('db.sqlite')
        cursor = db.cursor()
        # 判断文章是否存在
        cursor.execute(f'select count(*) from articles where articleId = {articleId}')
        if cursor.fetchone()[0] == 0:
            return '文章不存在', 400
        # 判断用户权限
        cursor.execute(f'select authorId from articles where articleId = {articleId}')

        if cursor.fetchone()[0] != userId:
            return '无权限', 400
        # 构建需要修改的数据
        res = []
        for item in request.json:
            if request.json.get(item) != (None or '') and item != 'articleId' :
                res.append([item, request.json.get(item)])

        # 生成时间
        dateTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        res.append(['date', dateTime])
        # 修改haschange
        res.append(['hasChange', 1])

        # 修改数据   
        for item in res:
            cursor.execute(f'update articles set {item[0]} = "{item[1]}" where articleId = {articleId}')
    else:
        return '参数错误', 400

    


    
    
    db.commit()
    

    return '成功', 200

@app.route('/checkUser', methods=['GET'])
def checkUser():
    userName = request.args.get('userName')
    if userName == None:
        return '参数错误', 400
    
    db = sqlite3.connect('db.sqlite')
    cursor = db.cursor()
    # 判断用户是否存在
    if cursor.execute(f'select count(*) from users where userName = {userName}').fetchone()[0] == 0:
        return '用户不存在', 400
    # 获取用户id
    cursor.execute(f'select userId from users where userName = {userName}')
    userId = cursor.fetchone()[0]
    return {"userId": userId}, 200

if __name__ == '__main__':
    main()
    app.run(port='7921', host='0.0.0.0')