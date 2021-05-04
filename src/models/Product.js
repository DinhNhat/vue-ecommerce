import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create schema
export const ProductSchema = new Schema({
    idNum: String,
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    averageRating: Number
});

// export const Product = mongoose.model('product', ProductSchema);
