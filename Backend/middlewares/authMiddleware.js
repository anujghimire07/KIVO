const jwt = require("jsonwebtoken")

async function auth(req, res, next) {
    //! Accept the token from the Authorization header (works cross-site: Vercel -> Render)
    //! with a cookie fallback for local/same-site dev setups.
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : req.cookies.token

    if (!token) return res.status(401).json({ error: "Not logged in" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }
}

module.exports = auth