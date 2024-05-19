drop TABLE if exists Users;
CREATE TABLE Users (  
    userId INT UNSIGNED NOT NULL PRIMARY KEY, 
    userName VARCHAR(255) NOT NULL,  
    userPassword VARCHAR(255) NOT NULL, -- 注意：密码应存储为哈希值，而不是明文  
    photo TEXT, -- base64编码的图片，使用TEXT类型存储  
    label VARCHAR(255),  
    address VARCHAR(255),  
    mail VARCHAR(255),  
    github VARCHAR(255),  
    wechat_id VARCHAR(255), -- 微信ID，单独作为一个字段，而不是嵌套在对象中  
    wechat_qrCode TEXT -- base64编码的二维码图片，使用TEXT类型存储  
);  

drop TABLE if exists Articles;
CREATE TABLE Articles (  
    articleId INT UNSIGNED NOT NULL PRIMARY KEY, 
    articleTitle VARCHAR(255),
    articleText TEXT NOT NULL, -- 内容  
    date DATETIME NOT NULL, -- 发布时间  
    authorId INT UNSIGNED NOT NULL, -- 外键，关联到用户表的userId  
    hasChange BOOLEAN DEFAULT FALSE, -- 布尔值，默认False  
    FOREIGN KEY (authorId) REFERENCES Users(userId) ON DELETE CASCADE -- 设置外键约束，并设置级联删除  
); 