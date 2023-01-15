const router = require("express").Router()
const productController = require("../controllers/product.controller")
const auth = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.get("/api", productController.getAllProducts)
router.get("/api/myproducts", auth, productController.getMyProducts)
router.get("/api/single/:id", productController.singleProduct)
router.post("/api/add", auth, productController.addProduct)
router.delete("/api/single/:id", auth, productController.delProduct)
router.patch("/api/single/:id", auth, productController.editProduct)
// router.get("/myproducts", auth, productController.myProducts)

router.post("/api/productImg/:id", auth, upload.single("productImg"), productController.uploadImg)

module.exports = router