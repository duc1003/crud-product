import express from 'express';
import { getAllProducts, addProduct, deleteProduct, updateProduct } from '../controllers/ProductController.js';

const route = express.Router();

route.get('/', getAllProducts);
route.post('/', addProduct);
route.delete(':id', deleteProduct);
route.put(':id', updateProduct);

export default route;