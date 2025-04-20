
import express from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
