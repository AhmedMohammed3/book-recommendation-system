const User = require('../models/User');

class UserService {
    static instance;
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async getUserById(user_id) {
        return await User.findOne({
            user_id
        });
    }
}

module.exports = UserService;