var con = require("../configs/database");
const bcrypt = require("bcryptjs");

exports.get = (request, response, next) => {
    con.query(`SELECT * FROM users`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "Empty users" });
        }
        return response.status(201).send({ error: false, data: result, message: "User founded" });
    });
};

exports.create = (request, response, next) => {
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

exports.update = (request, response, next) => {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        con.query(`UPDATE users SET name = ${con.escape(request.body.name)} WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
            if (error) {
                return response.status(400).send({ error: error, data: null, message: "There are some errors" });
            }
            return response.status(201).send({ error: false, data: [], message: "The user has been updated!" });
        });
    });
};

exports.show = (request, response, next) => {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        return response.status(201).send({ error: false, data: result[0], message: "User founded." });
    });
};

exports.delete = (request, response, next) => {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        con.query(`DELETE FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
            return response.status(201).send({ error: false, data: [], message: "User deleted." });
        });
    });
};