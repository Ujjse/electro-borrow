const router = require('express').Router();
const productController= require('../controllers/productController');
const { authGuard, adminGuard} = require('../middleware/authGuard');

router.post('/create', productController.createProduct)
router.get('/get_all_products', productController.getAllProducts)
router.get('/get_single_product/:id',  productController.getSingleProduct)
router.delete('/delete_product/:id',adminGuard, productController.deleteProduct)
router.put('/update_product/:id', productController.updateProduct)
router.get('/pagination', productController.paginationProduct)

module.exports= router