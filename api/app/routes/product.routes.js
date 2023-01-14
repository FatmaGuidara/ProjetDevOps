const router = require("express").Router()
const productController = require("../controllers/product.controller")
const auth = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.get("/", productController.getAllProducts)
router.get("/myproducts", auth, productController.getMyProducts)
router.get("/single/:id", productController.singleProduct)
router.post("/add", auth, productController.addProduct)
router.delete("/single/:id", auth, productController.delProduct)
router.patch("/single/:id", auth, productController.editProduct)
// router.get("/myproducts", auth, productController.myProducts)

router.post("/productImg/:id", auth, upload.single("productImg"), productController.uploadImg)

module.exports = router