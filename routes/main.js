const register = require ('./register.route')
const activation = require ('./activation.route')
const login = require ('./login.route')
const reset = require ('./reset.route')
const role = require ('./role.route')
const user = require ('./user.route')
const verifyJWT = require ('../middleware/verify_jwt.middleware')

const routes = (app) => {
    app.use('/register', register)
    app.use('/activation', activation)
    app.use('/login', login)
    app.use('/reset', reset)
    app.use('/role', verifyJWT(),role)
    app.use('/user', verifyJWT(), user)
}

module.exports = routes