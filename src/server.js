import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import history from 'connect-history-api-fallback';
import productRoutes from './routes/api/productRoutes';
import userRoutes from './routes/api/userRoutes';
// DB URI import
import mongoURI from './config/keys';

const app = express();
const PORT = 80;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
app.use(history());

// connect to Mongo
mongoose.Promise = global.Promise;
const connectString = mongoURI();
mongoose.connect(connectString, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Atlas Connected...'))
    .catch(err => console.log(err));

// Call Routes
productRoutes(app);
userRoutes(app);

// Serve static folder
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.get('/', (request, response) => {
//     response.send(`Node and Express server running on port ${PORT}`);
// });

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});