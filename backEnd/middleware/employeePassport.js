const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../config/employeeConfig');

const ExtractJwt = passportJWT.ExtractJwt;

const Employee = require('../models/EmployeeModel');

const Stratagy = passportJWT.Strategy;

const params = {
    secretOrKey: config.secret,

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = ()=>{
    const strategy = new Stratagy(params, async (payload, done) => {
        const Emp = await Employee.findById(payload.id);
        if (!Emp) {
            return done(new Error("Employee not found"), null);
        } else
            return done(null, user);
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", {
                session: false
            });
        }
    };
}