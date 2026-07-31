const { todoModel, userModel } = require("../Models/model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//homepage
async function home(req, res) {
    try {
        res.status(200).send("welcome to homepage")
    } catch (err) {
        res.json({ error: err.message })
    }
}

//get all data
async function getalldata(req, res) {
    try {
        const data = await todoModel.find({ userId: req.user.userId });
        res.status(200).json({ message: "Todos found successfully", data: data })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//get data by id
async function getdatabyid(req, res) {
    try {
        const data = await todoModel.findOne({ userId: req.user.userId, _id: req.params.id })
        if (!data) return res.status(404).json({ message: "not found" })
        
            res.status(200).json({ message: "Todo found successfully", data: data })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//post data
async function postdata(req, res) {
    try {
        const data = await todoModel.create({ ...req.body, userId: req.user.userId })
        res.status(201).json({ message: "Todo posted successfully", data: data })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//patch data
async function patchdata(req, res) {
    try {
        const data = await todoModel.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, { $set: req.body }, { new: true })
        if(!data) return res.status(404).send("Todo not found")
        res.status(200).json({ message: "Todo data patched successfully", new_data: data })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//delete data
async function deletedata(req, res) {
    try {
        const data = await todoModel.findOneAndDelete({_id: req.params.id, userId: req.user.userId})
        if(!data) return res.status(404).send("Todo not found")
        res.status(200).json({ message: "user data deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//signup
async function signup(req, res) {
    const { email, password } = req.body

    const exist = await userModel.findOne({ email })
    // if (exist) return res.send("User already exists")
    if (exist) return res.status(400).json({ error: "User already exists" }) //! changed here: returns proper error status + json so the frontend can show it

    const hashed = await bcrypt.hash(password, 10)

    await userModel.create({ email: email, password: hashed })
    // res.send("Signup success")
    res.status(201).json({ message: "Signup success" }) //! changed here: returns 201 + json
}

//login
async function login(req, res) {
    const { email, password } = req.body

    const exist = await userModel.findOne({ email })
    // if (!exist) return res.send("user doesnot exist")
    if (!exist) return res.status(401).json({ error: "User does not exist" }) //! changed here: 401 + json

    const match = await bcrypt.compare(password, exist.password)
    // if (!match) return res.send("Incorrect password")
    if (!match) return res.status(401).json({ error: "Incorrect password" }) //! changed here: 401 + json

    const token = jwt.sign(
        { userId: exist._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    // res.cookie("token", token, { httpOnly: true })//*httpOnly prevents XSS attacks, only server can access cookie
    res.cookie("token", token, { //! changed here: added sameSite/secure options so the cookie works cross-site (Vercel frontend -> Render backend) in production
        httpOnly: true, //*httpOnly prevents XSS attacks, only server can access cookie
        ...(process.env.NODE_ENV === "production"
            ? { sameSite: "none", secure: true }
            : {})
    })
    // res.send("Login success")
    res.status(200).json({ message: "Login success", email }) //! changed here: returns json + email so the frontend can display it
}

//logout
async function logout(req, res) {
    // res.clearCookie("token")
    res.clearCookie("token", { //! changed here: matching cookie options so the cookie is cleared properly in production
        ...(process.env.NODE_ENV === "production"
            ? { sameSite: "none", secure: true }
            : {})
    })
    // res.send("logged out")
    res.status(200).json({ message: "logged out" }) //! changed here: returns json
}

module.exports = {
    home,
    getalldata,
    getdatabyid,
    postdata,
    patchdata,
    deletedata,
    signup,
    login,
    logout
}