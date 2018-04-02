import Product from '../models/product';
import multer from 'multer';
const path = require('path');

const DIR = './public';
const storage = multer.diskStorage({
    destination: DIR,
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({
    // limits: {fileSize: 10},
    storage: storage
}).single('imageFile');

export const getProducts = (req, res) => {
    Product.find().sort({ ordinal: 1 }).exec((err, products) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Products fetched successfully', products });
    });
}

// export const deleteProductsByType = (req, res) => {
//     Product.remove({ productTypeId: req.query.typeId }, (err) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }
//         return res.json({ 'success': true, 'message': 'deleted by product type successfully' });
//     })
// }

export const addProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(442).send('an Error occurred');
        } else {
            console.log(req.body);
            const newProduct = new Product(req.body);
            console.log(newProduct);
            newProduct.save((err, product) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error' });
                }
                return res.json({ 'success': true, 'message': 'Product added successfully', product });
            })
        }
    })
}

export const updateProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(442).send('an Error occurred');
        } else {
            console.log(req.body);
            Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, product) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                }
                console.log(product);
                return res.json({ 'success': true, 'message': 'Updated successfully', product });
            })
        }
    })
}

export const getProduct = (req, res) => {
    Product.find({ _id: req.params._id }).exec((err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        if (product.length) {
            return res.json({ 'success': true, 'message': 'Product fetched by id successfully', product });
        } else {
            return res.json({ 'success': false, 'message': 'Product with the given id not found' });
        }
    })
}

export const deleteProduct = (req, res) => {
    console.log(req.body);
    Product.findByIdAndRemove(req.params._id, (err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': ' deleted successfully' });
    })
}