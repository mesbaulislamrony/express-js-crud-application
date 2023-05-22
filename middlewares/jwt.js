const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
	let token = request.body.token;
	if (!token) {
		return response.status(403).send({
			message: "No token provided!"
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return response.status(401).send({
				message: "Unauthorized!"
			});
		}
		request.user = decoded;
		next();
	});
};
module.exports = verifyToken;