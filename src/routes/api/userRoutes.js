import {
    getCartItems,
    addItemToCart,
    removeItemFromCart
} from '../../controllers/userController';

const routes = (app) => {
    app.route('/api/users/:userId/cart')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getCartItems)
        .post((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, addItemToCart);

    app.route('/api/users/:userId/cart/:productIdNum')
        .delete((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, removeItemFromCart);
}

export default routes;