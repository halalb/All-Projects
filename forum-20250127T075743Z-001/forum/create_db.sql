-- Create database script for the Forum App

-- Create the database
CREATE DATABASE IF NOT EXISTS myForum;
USE myForum;

-- Create the tables
CREATE TABLE IF NOT EXISTS topics (id INT AUTO_INCREMENT, title VARCHAR(50), description VARCHAR(255), PRIMARY KEY(id));
CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(255), PRIMARY KEY(id));
CREATE TABLE IF NOT EXISTS posts (id INT AUTO_INCREMENT, content TEXT, userId INT, topicId INT, PRIMARY KEY(id));
CREATE TABLE IF NOT EXISTS posts (iduser INT, idtopic INT, PRIMARY KEY(iduser, idtopic), FOREIGN KEY (iduser) REFERENCES users(id),
    FOREIGN KEY (idtopic) REFERENCES topics(id));

-- Create the app user if not exists and give it access to the database
CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myForum.* TO 'appuser'@'localhost';
