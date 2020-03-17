const jwt = require("jsonwebtoken")

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}
	
	return async (req, res, next) => {
		try {
			const { token } = req.cookies
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, "asdfjkl;qwertyuiopzxcvbnm", (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
                }
                
				req.token = decoded

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict