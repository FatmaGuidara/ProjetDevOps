const router = require("express").Router()
const CategoryController = require("../controllers/category.controller")
const auth = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.get("/api", CategoryController.getAllCategories)
router.get("/api/single/:id", CategoryController.singleCategory)
router.get("/api/products/:id", CategoryController.categoryProducts)
router.post("/api/add", auth, upload.single("categoryImg"), CategoryController.addCategory)
router.delete("/api/single/:id", auth, CategoryController.delCategory)
router.patch("/api/single/:id", auth, CategoryController.editCategory)

router.post("/api/categoryImg/:id", auth, upload.single("categoryImg"), CategoryController.uploadImg)

module.exports = router