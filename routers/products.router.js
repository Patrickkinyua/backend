import express from 'express';
const app = express();
import Product from '../models/product.model.js';

const router = express.Router();

router.post('/', async (req,res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newProduct = new Product (product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } 
  catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get('/', async (req, res) => {
  try {
const products = await Product.find({});
res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

})

router.put('/:id', async (req, res) => {
  const {id} =req.params;
  const product = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json(updatedProduct);
  }
    catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
})


router.delete('/:id', async (req, res) => {
  const {id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
})
export default router;