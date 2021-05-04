import mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { ProductSchema } from '../models/Product';

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

export const getCartItems = (req, res) => {
    const userId = req.params.userId;
    User.findOne({ idCustom: userId })
        .then(user => {
            // const gotUser = doc.find(user => user.idCustom === userId);
            const cartItemIds = user.cartItems;
            // console.log(cartItems);
            Product.find({})
                .then(docs => {
                    const cartItems = cartItemIds.map(id => docs.find(product => product.idNum === id));
                    res.status(200).json(cartItems);
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.status(404).json(`Could not find the user!`)); // no user found
}

export const addItemToCart = (req, res) => {
    const filter = { idCustom: req.params.userId };
    const { productId } = req.body;
    User.findOne(filter).then(doc => {
        // check if an item already exists in cart shopping
        const cartItemsBeforeUpdate = doc.cartItems;
        let isAlreadyIncart = cartItemsBeforeUpdate.some(element => element === productId);
        if (!isAlreadyIncart) {
            // add item in cart
            cartItemsBeforeUpdate.push(productId);
            User.updateOne({ idCustom: doc.idCustom }, { cartItems: cartItemsBeforeUpdate })
                .then(docs => {
                    if (docs.nModified === 1) {
                        console.log(`add product to cart successfully!!!`);
                        res.send(doc);
                    } else {
                        res.send(`Failed to add product, `)
                    }
                })
                .catch(err => res.send(`something went wrong when update cartItems array `, err));
        } else {
            res.send(`Product is already in cart!`);
        }
    }).catch(err => res.send(`find user went wrong`));
}

export const removeItemFromCart = async (req, res) => {
    const filter = { idCustom: req.params.userId };
    const productIdNum = req.params.productIdNum;

    User.findOne(filter)
        .then(user => {
            const cartItemsAfterRemove = user.cartItems.filter(productId => productId !== productIdNum);
            User.updateOne(filter, { cartItems: cartItemsAfterRemove })
                .then(resUpdate => {
                    getCartItemsByProductIdNum(req, res, filter);
                })
                .catch(err => res.status(404).json(`failed to remove product from cart!!!`));
        })
        .catch(err => res.status(404).json(`Could not find user!!!`));
}


/**
 * *************************
 * @Comments Utility methods
 * *************************
 */
async function getCartItemsByProductIdNum(req, res, filter) {
    try {
        const user = await User.findOne(filter).exec();
        const products = await Product.find({}).exec();
        if (!user) return res.status(401).json({ message: "Unauthorized." });
        const cartItemIds = user.cartItems;
        const cartItems = cartItemIds.map(id => products.find(product => product.idNum === id));
        res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
}