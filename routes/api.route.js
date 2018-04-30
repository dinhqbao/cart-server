import express from 'express';
import * as productController from '../controllers/product.controller';
import * as tableController from '../controllers/table.controller';
import * as orderController from '../controllers/order.controller';

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

router.route('/order/:tableName')
    .get(orderController.getNewOrderByTable);

router.route('/order/')
    .get(orderController.getOrders);


export default router;