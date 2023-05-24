var con = require("../helpers/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

exports.register = (request, response, next) => {
    User.create({
        name: request.body.name,
        mobile_no: request.body.mobile_no,
        password: bcrypt.hashSync(request.body.password, 8),
    }).then(data => {
        const token = jwt.sign({ user: data }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return response.status(201).send({ error: false, data: token, message: "The user has been logged in with us!" });
    }).catch(errors => {
        return response.status(409).send({ error: false, data: errors.message , message: null });
    });
};

exports.login = (request, response, next) => {
    User.findOne({ where: { mobile_no: request.body.mobile_no}}).then(data => {
        if (!data) {
            return response.status(404).send({ error: false, data: data , message: "Credential not found!" });
        }
        bcrypt.compare(request.body.password, data.password, (bcryptError, bcryptResult) => {
            if (!bcryptResult) {
                return response.status(400).send({ error: bcryptError, data: null, message: "Email or password did not match!" });
            }
            const token = jwt.sign({ user: data }, process.env.JWT_SECRET, { expiresIn: "2h" });
            return response.status(201).send({ error: false, data: token, message: "The user has been logged in with us!" });
        });
    }).catch(errors => {
        return response.status(409).send({ error: false, data: errors.message , message: "Something was wrong here!" });
    });
};

exports.logout = (request, response, next) => {
    jwt.verify(request.body.token, process.env.JWT_SECRET, function(errors, decoded) {
        const token = jwt.sign({ user: decoded }, process.env.JWT_SECRET, { expiresIn: 1 });
        return response.status(201).send({ error: false, data: token, message: "The user has been logged out!" });
    });
};

exports.me = (request, response, next) => {
    jwt.verify(request.body.token, process.env.JWT_SECRET, function(errors, decoded) {
        return response.status(200).send({ error: false, data: decoded, message: "You are logged in!" });
    })
};
