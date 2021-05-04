import mongoose from 'mongoose';
import { ProductSchema } from '../models/Product';

const Product = mongoose.model('Product', ProductSchema);

export const getProducts = (req, res) => {
    Product.find({}).then(docs => res.status(200).json(docs)).catch(err => res.send(res));
}

export const getProductByIdNum = (req, res) => {
    Product.findOne({ idNum: req.params.productId })
        .then(doc => res.status(200).json(doc))
        .catch(err => res.send(err));
}