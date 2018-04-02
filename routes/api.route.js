import express from 'express';
import * as productController from '../controllers/product.controller';
import * as tableController from '../controllers/table.controller';

const router = express.Router();

router.route('/product/')
    .get(productController.getProducts)
    .post(productController.addProduct)
    .put(productController.updateProduct);
// .delete(productController.deleteProductsByType);

router.route('/product/:_id')
    .get(productController.getProduct)
    .delete(productController.deleteProduct);

router.route('/table/')
    .get(tableController.getTables)
    .post(tableController.addTable)
    .put(tableController.updateTable);

router.route('/table/:_id')
    .delete(tableController.deleteTable);

export default router;