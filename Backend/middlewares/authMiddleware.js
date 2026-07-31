const jwt = require("jsonwebtoken")

async function auth(req, res, next) {
    const token = req.cookies.token
    // if (!token) return res.send("not logged in")
    if (!token) return res.status(401).json({ error: "Not logged in" }) //! changed here: 401 + json so the frontend can detect unauthenticated requests

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        // res.send("invalid token")
        res.status(401).json({ error: "Invalid token" }) //! changed here: 401 + json
    }
}

module.exports = auth