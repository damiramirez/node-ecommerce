const express = require('express');
const ProductManager = require('./ProductManager');

const PORT = 8000;
const app = express();

const productManager = new ProductManager('./src/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getAllProducts();
  if (limit) return res.send(products.slice(0, limit));

  return res.send({ products });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(id);
  if (!product) return res.status(404).send({ err: 'ID not found' });

  return res.send({ product });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
