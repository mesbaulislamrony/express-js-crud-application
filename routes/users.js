var express = require('express');
var router = express.Router();
var con = require("../configs/database");

router.get('/', function(request, response, next) {
    con.query(`SELECT * FROM users`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "Empty users" });
        }
        return response.status(201).send({ error: false, data: result, message: "User founded" });
    });
});

router.post('/', function(request, response, next) {
    con.query(`SELECT * FROM users WHERE mobile_no = ${con.escape(request.body.mobile_no)}`, function (error, result, fields) {
        if (result.length == 1) {
            return response.status(409).send({ error: false, data: [], message: "This user is already in use" });

        }
        con.query(`INSERT INTO users (name, mobile_no, password) VALUES (${con.escape(request.body.name)}, ${con.escape(request.body.mobile_no)}, ${con.escape(request.body.password)})`, function (error, result) {
            if (error) {
                return response.status(400).send({ error: error, data: null, message: error });
            }
            return response.status(201).send({ error: false, data: result[0], message: "The user has been registerd with us!" });
        });
    });
});

router.get('/:id', function(request, response, next) {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        return response.status(201).send({ error: false, data: result[0], message: "User founded." });
    });
});

router.put('/:id', function(request, response, next) {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        con.query(`UPDATE users SET name = ${con.escape(request.body.name)} WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
            if (error) {
                return response.status(400).send({ error: error, data: null, message: error });
            }
            return response.status(201).send({ error: false, data: [], message: "The user has been updated!" });
        });
    });
});

router.delete('/:id', function(request, response, next) {
    con.query(`SELECT * FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
        if (result.length == 0) {
            return response.status(409).send({ error: false, data: [], message: "User not found!" });
        }
        con.query(`DELETE FROM users WHERE id = ${con.escape(request.params.id)}`, function (error, result) {
            return response.status(201).send({ error: false, data: [], message: "User deleted." });
        });
    });
});

module.exports = router;
