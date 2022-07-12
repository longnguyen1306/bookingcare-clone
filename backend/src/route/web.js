import express from "express";
import homeController from '../controllers/homeController';
import crudController from '../controllers/crudController';
import userController from '../controllers/api/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    //api
    router.post('/api/login', userController.handleLogin);




    //routes
    router.get('/', homeController.getHomePage);
    router.get('/crud', crudController.getCrud);
    router.get('/crud/create', crudController.getCreateCrud);
    router.post('/crud/create', crudController.postCreateCrud);
    router.get('/crud/edit', crudController.getEditFormCrud);
    router.post('/crud/edit', crudController.postEditCrud);
    router.get('/crud/delete', crudController.getDeleteCrud);


    //end routes
    return app.use("/", router);
}

module.exports = initWebRoutes;