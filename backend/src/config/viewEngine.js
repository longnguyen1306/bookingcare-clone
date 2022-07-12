import express from 'express';

let configViewEngine = (app) => {
    //cau hinh static folder
    app.use(express.static("./src/public"));

    //cau hinh view engine
    app.set("view engine", "ejs"); //jsp, blade

    //au hinh views folder
    app.set("views", "./src/views");
}

module.exports = configViewEngine;