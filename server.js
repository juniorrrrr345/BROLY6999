
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import './bot/telegram.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur de connexion MongoDB:', err));

app.use('/api/products', productRoutes);

app.get('/admin', async (req, res) => {
    const Product = (await import('./models/Product.model.js')).default;
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('dashboard', { products });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
