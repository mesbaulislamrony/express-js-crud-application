const jwt = require("jsonwebtoken");
const auth = require("../configs/auth");

const verifyToken = (req, res, next) => {
	let token = req.body.token;
	if (!token) {
		return res.status(403).send({
			message: "No token provided!"
		});
	}

	jwt.verify(token, auth.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}
		req.user = decoded;
		next();
	});
};
module.exports = verifyToken;