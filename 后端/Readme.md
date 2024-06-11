# 请求接口文档



接口地址 http://api.cycodes.cn

- 获取用户列表

  - 路径："/getUserList"

  - 请求方式： get

  - 请求参数：null

  - 返回状态：200

  - 返回数据：

    ```json
    [
        {
            "userName":"",
            "userId":"",
            "articleCount":""
        },
        ......
    ]
    ```
    
    

- 获取用户文章列表

  - 路径："/getUserArticle"

  - 请求方式： get

  - 请求参数：userId

  - 返回值：200，400（参数错误）

  - 返回数据：

    ```json
    [
        {
            "title":"",
            "articleId":"",
            "authorId":"",
            "dateTime":""
        },
        ......
    ]
    ```

    

- 注册/修改用户信息

  - 路径："/setUser"

  - 请求方式： post

  - 请求参数：

    ```json
    //以下皆可为空值
    {
        "userName":"",
        "userPassword":"",
        "userId":"", //修改信息时使用
        "photo":"",//base64编码
        "label":["","",],
        "address":"",
        "mail":"",
        "github":"",
        "wechat":{
            "id":"",
            "qrCode":"" //base64编码
        },
    }
    ```

  - 返回状态码：200(成功)，400(用户已存在)

  - 返回数据：

  ```json
  //200
  "注册成功"/"修改成功"
  
  //400
  "用户已存在"
  ```
  
  
  
- 获取用户信息

  - 路径："/getUserInfo"

  - 请求方式： get

  - 请求参数：userId

  - 返回值：200，120(请求失败)

  - 返回数据：

    ```json
    {
        "userName":"",
        "userId":"",
        "photo":"",//base64编码
        "label":["",""],
        "address":"",
        "mail":"",
        "github":"",
        "wechat":{
            "id":"",
            "qrCode":"" //base64编码
        },
    }
    ```

    

- 获取某篇文章

  - 路径："/getArticle"

  - 请求方式： get

  - 请求参数：articleId

  - 返回值：200，400（错误）

  - 返回数据：

    ```json
    // 200
    {
        "title":"",
        "authorName":"",
        "authorId":"",
        "article":"", //base64编码
    }
    
    //400
    message：错误原因
    ```
    
    

- 用户登录

  - 路径："/login"

  - 请求方式： post

  - 请求参数：

    ```json
    {
        "userName":"",
        "userPassword":"",
    }
    ```

  - 返回值：200，500(参数错误)

  - 返回数据：

    ```json
    //200
    {
        "message":"Login successfully",
        "token":s.dumps({"idUser": user["idUser"], "email": user["email"]}).decode("utf-8")
    }
    
    //返回示例
    {
        "data": {
            "message": "登录成功",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNTg3MTEwOCwianRpIjoiODI5MWY0NzQtOTgzOS00MzZmLTlmOWItZDkwODg3Y2IyMjllIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MjM0LCJuYmYiOjE3MTU4NzExMDgsImNzcmYiOiJmZmRkOWI1OS1jMTQxLTQwOGItYTQ3YS00NGQ0YzQzODExOTQiLCJleHAiOjE3MTU4NzIwMDh9.7c6eIieArPJEhDN8_0fwRn-nb5SpaxFd0zqas0Xf2xQ"
        }
    }
    
    
    #前端收到token后将token放入后续请求的头部：
    get({headers={"Authorization":"加密后的token"},body={}})
    
    
    ```

    

- 发布或修改文章或删除

  - 路径："/setArticle"

  - 请求方式： post

  - 请求参数：

    ```json
    {
    	"articleText":"", //base64编码，删除时为空
        "articleTitle":"",
        "articleId":"" //发布时为空，修改时必须
    }
    ```

    

  - 返回状态：200，400

  - 返回数据：

  ```json
  message
  ```