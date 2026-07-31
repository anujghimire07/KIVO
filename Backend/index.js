const express = require("express")
require("dotenv").config()
const app = express()

//*middlewares
const cors = require("cors");

//! allow one or more comma-separated origins (e.g. local dev + Vercel). Falls back to
//! reflecting the request origin so credentialed requests never break in production.
const CLIENT_URLS = (process.env.CLIENT_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

app.use(cors({
    origin: CLIENT_URLS.length ? CLIENT_URLS : true,
    credentials: true //*allows cookies to be sent to and from backend/frontend
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cookieParser = require("cookie-parser")
app.use(cookieParser())

//*database connection
const connectDB = require("./config/db")
connectDB()
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err))

//*routes
const router = require("./Routes/routes");
app.use("/api/auth", router)

//*server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server Successfully started on port: ${PORT}`)) 