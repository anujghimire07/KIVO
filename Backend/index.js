const express = require("express")
require("dotenv").config()
const app = express()

//*middlewares
const cors = require("cors");
// app.use(cors({
//     origin: "http://localhost:5173",//*Only allow requests coming from http://localhost:5173
//     credentials: true //*allows cookies to be sent to and from backend/frontend
// }))
app.use(cors({
    origin: process.env.CLIENT_URL, //! changed here: reads allowed origin from CLIENT_URL in .env (works for localhost AND the deployed Vercel URL)
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