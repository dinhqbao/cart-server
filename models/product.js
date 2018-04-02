import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String,
    price: Number,
    image: String,
    ordinal: Number
});
export default mongoose.model('Product', Schema);