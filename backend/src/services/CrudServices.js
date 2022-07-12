import bcrypt from 'bcryptjs';
import db from '../models/index';
import {where} from "sequelize";
import {raw} from "express";

let salt = bcrypt.genSaltSync(10);

//get all users
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let AllUser = await db.User.findAll({
                raw: true
            });
            resolve(AllUser);
        } catch (e) {
            reject(e);
        }
    });
}

//create new user
let postCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
            });
            resolve('Create new user success');
        } catch (e) {
            reject(e);
        }
    });
}

//edit
let getEditCrud = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                await user.save();

                resolve(user)
            }  else {
                resolve({});
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: id
                },
            });
            if (user) {
                await user.destroy();
                resolve()
            }  else {
                resolve({});
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: id
                },
                raw: true
            })
            if (user) {
                resolve(user);
            }  else {
                resolve({});
            }
        } catch (e) {
            reject(e)
        }
    })
}

//hash password
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await bcrypt.hashSync(password, salt);
            resolve(hashPass);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postCreateUser,
    getAllUsers,
    getEditCrud,
    getUsers,
    getDeleteUser
}