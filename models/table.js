import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String,
    // totalPrice: Number,
    ordinal: Number
});
export default mongoose.model('Table', Schema);