import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.connect.js';
import router from './routers/products.router.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use('/products', router);

app.listen(5000, () => {
  console.log('Server is running on port http://localhost:5000');
  connectDB();
});