const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/user/signup', UserController.signupUser);
    app.post('/api/user/login', UserController.loginUser);
}