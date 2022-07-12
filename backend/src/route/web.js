import express from "express";
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    //routes
    router.get('/', homeController.getHomePage);
    //end routes
    return app.use("/", router);
}

module.exports = initWebRoutes;