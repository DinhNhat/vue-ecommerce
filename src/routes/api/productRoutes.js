import {
    getProducts,
    getProductByIdNum
} from '../../controllers/productController';

const routes = (app) => {
    app.route('/api/products')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getProducts);

    app.route('/api/products/:productId')
        .get(getProductByIdNum);
}

export default routes;