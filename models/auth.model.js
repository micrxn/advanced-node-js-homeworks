const path = require("path")
const {v4: uuid} = require("uuid")
const DataService = require("../services/data.services");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class AuthModel {
    static async loginUser(credentials) {
        const {email, password } = credentials;
        const users = await DataService.readJSONFile(usersPath);
        const validUser = users.find(user => user.email === email && user.password === password);
        if(!validUser) return Promise.reject({msg: "Invalid Credentials"});
        return validUser
    }
    static async registerUser(newUserData){
        
        const users = await DataService.readJSONFile(usersPath);
        const emailExists = users.find(user => user.email === newUserData.email);
        if(emailExists) return Promise.reject({msg: "email exists"});

        const registerNewUser = {
            id: uuid(),
            ...newUserData
        };

        const updatedUsers = [...users, registerNewUser];

        await DataService.saveJSONFile(usersPath, updatedUsers);

        return registerNewUser;
    }
}

module.exports = AuthModel