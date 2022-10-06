# Streamframe-Coding-Assignment

## Install Backend Server

#### In the project root directory, you can run:

### `npm install`

## Create Database from your localhost mysql with db name: taskapp

### Refer to db.config.js file in backend/config, and Update on your database base on your db configuration (refer on the example down)


**sample db.config.js file**

`module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "taskapp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};`

#### Run backend server

### `nodemon server.js`

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.

