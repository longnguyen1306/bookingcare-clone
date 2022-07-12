import UserService from '../../services/UserServices';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //validation
    if (!email || !password) {
        //validate false
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        });
    }
    //check email exist
    let userData = await UserService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData: userData.user ? userData.user : {}
    });
}

module.exports = {
    handleLogin
}