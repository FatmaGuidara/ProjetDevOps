const router = require("express").Router()
const userController = require("../controllers/user.controller")
const upload = require("../middleware/fileUpload.middleware")

const auth = require("../middleware/auth.middleware")

router.post("/api/register", userController.register)
router.post("/api/login", userController.login)
router.get("/api", auth, userController.getAllUsers)
router.post("/api/logout", auth, userController.logout)
router.post("/api/logoutAll", auth, userController.logoutAll)
router.get("/api/single/:id", auth, userController.singleUser)
router.delete("/api/single/:id", auth, userController.delUser)
router.patch("/api/single/:id", auth, userController.editUser)

router.post("/api/profile", auth, userController.profile)

router.post("/api/imgUpload", auth, upload.single("myImg"), userController.uploadImg)


module.exports = router