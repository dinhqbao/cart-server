import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    tableId: Number,
    totalPrice: Number,
    cart: [{
        productId: String,
        nuitPrice: Number,
        quantity: Number
    }]
});
export default mongoose.model('Table', Schema);