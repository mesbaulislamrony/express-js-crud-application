var con = require("../configs/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../configs/auth");

exports.register = (request, response, next) => {
    con.query(`SELECT * FROM users WHERE mobile_no = ${con.escape(request.body.mobile_no)}`, function (error, result, fields) {
        if (result.length == 1) {
            return response.status(409).send({ error: false, data: [], message: "This user is already in use" });

        }
        bcrypt.hash(request.body.password, 10, (err, hash) => {
            if (error) {
                return response.status(400).send({ error: error, data: null, message: "There are some errors" });
            }
            con.query(`INSERT INTO users (name, mobile_no, password) VALUES (${con.escape(request.body.name)}, ${con.escape(request.body.mobile_no)}, ${con.escape(hash)})`, function (error, result) {
                if (error) {
                    return response.status(400).send({ error: error, data: null, message: "There are some errors" });
                }
                return response.status(201).send({ error: false, data: result[0], message: "The user has been registerd with us!" });
            });
        });
    });
};

exports.login = (request, response, next) => {
    con.query(`SELECT * FROM users WHERE mobile_no = ${con.escape(request.body.mobile_no)}`, function (error, result, fields) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "This user not found" });

        }
        bcrypt.compare(request.body.password, result[0]["password"], (bcryptError, bcryptResult) => {
            if (bcryptError) {
                return response.status(400).send({ error: bcryptError, data: null, message: "Email or password is incorrect" });
            }
            if (bcryptResult) {
            	const token = jwt.sign({ id: result[0].id }, auth.secret, { expiresIn: "2h" });
            	return response.status(201).send({ error: false, data: token, message: "The user has been logged in with us!" });
            }
        });
    });
};