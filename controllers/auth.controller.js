const AuthModel = require("../models/auth.model")

class AuthController {
    static async loginUser(req, res) {
        try {
            const credentials = req.body

            const user = await AuthModel.loginUser(credentials);

            req.session.loggedIn = true;
            req.session.role = user.role;
            res.status(200).send(user)
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static async registerUser(req, res) {
        try {
            const newUserData = req.body;
            const registerNewUser = await AuthModel.registerUser(newUserData);
    
            res.status(201).send(registerNewUser);
        } catch (error) {
            res.status(400).send(error);
        }
       
    }
}

module.exports = AuthController