const router = require("express").Router()
const userController = require("../controllers/user.controller")
const upload = require("../middleware/fileUpload.middleware")

const auth = require("../middleware/auth.middleware")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/", auth, userController.getAllUsers)
router.post("/logout", auth, userController.logout)
router.post("/logoutAll", auth, userController.logoutAll)
router.get("/single/:id", auth, userController.singleUser)
router.delete("/single/:id", auth, userController.delUser)
router.patch("/single/:id", auth, userController.editUser)

router.post("/profile", auth, userController.profile)

router.post("/imgUpload", auth, upload.single("myImg"), userController.uploadImg)


module.exports = router