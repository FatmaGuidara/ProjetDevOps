const router = require("express").Router()
const CategoryController = require("../controllers/category.controller")
const auth = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.get("/", CategoryController.getAllCategories)
router.get("/single/:id", CategoryController.singleCategory)
router.get("/products/:id", CategoryController.categoryProducts)
router.post("/add", auth, upload.single("categoryImg"), CategoryController.addCategory)
router.delete("/single/:id", auth, CategoryController.delCategory)
router.patch("/single/:id", auth, CategoryController.editCategory)

router.post("/categoryImg/:id", auth, upload.single("categoryImg"), CategoryController.uploadImg)

module.exports = router