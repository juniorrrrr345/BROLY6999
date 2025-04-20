
import express from 'express';
const router = express.Router();

// Exemple de produit en mémoire (à remplacer par Mongo plus tard)
let products = [];

// Ajouter un produit
router.post('/', (req, res) => {
  const { name, price, image } = req.body;
  const newProduct = { id: Date.now(), name, price, image };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Obtenir tous les produits
router.get('/', (req, res) => {
  res.json(products);
});

export default router;
