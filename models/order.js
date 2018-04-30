import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    tableName: String,
    products: [{
        productId: String,
        productName: String,
        quantity: Number,
        note: String
    }],
    status: Number
});
export default mongoose.model('Order', Schema);