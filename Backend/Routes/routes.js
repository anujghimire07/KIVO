const express = require("express")
const router = express.Router()
const {
    home,
    getalldata,
    getdatabyid,
    postdata,
    patchdata,
    deletedata,
    signup,
    login,
    logout
} = require("../Controllers/controller")

const auth = require("../middlewares/authMiddleware")

//public
router.get("/", home)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

//protected todos
router.get("/todos", auth, getalldata)
router.get("/todos/:id", auth, getdatabyid)
router.post("/todos", auth, postdata)
router.patch("/todos/:id", auth, patchdata)
router.delete("/todos/:id", auth, deletedata)

//protected test route
router.get("/home", auth, (req, res) => {
    res.send("this is react homepage")
})

module.exports = router