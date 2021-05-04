import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create a subdocument
// const cartItem = new Schema({
//     itemId: String
// });s

export const UserSchema = new Schema({
    idCustom: String,
    cartItems: [String],
});