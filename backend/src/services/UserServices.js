import db from '../models/index';
import bcrypt from 'bcryptjs';

//xu ly dang nhap
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user ton tai
                let user = await db.User.findOne({
                    where: {
                        email: email
                    },
                    raw: true,
                    attributes: ['email', 'password', 'roleId']
                });
                if (user) {
                    //so sanh mat khau
                    let checkPass = await bcrypt.compareSync(password, user.password);
                    if (checkPass) {
                        //dung mat khau
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        //sai mat khau
                        userData.errCode = 3;
                        userData.errMessage = 'Mat khau khong dung';
                    }
                } else {
                    //user khong ton tai ==> return error
                    userData.errCode = 2;
                    userData.errMessage = 'User khong ton tai';
                }
                resolve(userData)
            } else {
                //user khong ton tai ==> return error
                userData.errCode = 1;
                userData.errMessage = 'Email khon ton tai, vui long nhap email khac!';
                resolve(userData)
            }
        } catch (e) {
            reject(e);
        }
    })
}

//kiem tra email co ton tai khong
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin
}