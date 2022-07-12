import CrudServices from '../services/CrudServices';

//list all user
let getCrud = async (req, res) => {
    let allUsers = await CrudServices.getAllUsers();
    res.render('crud/showCrud', {allUsers: allUsers});
}

//get form create
let getCreateCrud = (req, res) => {
    res.render('crud/getCreateCrud');
}

//post create user
let postCreateCrud = async (req, res) => {
    let message = await CrudServices.postCreateUser(req.body);

    res.redirect('/crud')
}

let postEditCrud = async (req, res) => {
    let id = req.body.id;
    if (id) {
        await CrudServices.getEditCrud(req.body);

        res.redirect('/crud')
    } else {
        res.send('Missing id')
    }
}

let getEditFormCrud = async (req, res) => {
    let user = await CrudServices.getUsers(req.query.id);

    res.render('crud/editForm', {user: user})
}

let getDeleteCrud = async (req, res) => {
    let id = req.query.id;
    await CrudServices.getDeleteUser(id);
    console.log(id)
    res.redirect('/crud')
}

//export all method
module.exports = {
    getCrud,
    getCreateCrud,
    postCreateCrud,
    postEditCrud,
    getEditFormCrud,
    getDeleteCrud
}