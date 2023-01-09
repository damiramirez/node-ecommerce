const fs = require('fs');

class ProductManager {
  products;
  static idProduct = 1;

  constructor(path) {
    this.path = path;
  }

  async getAllProducts() {
    return await this.readFile();
  }

  async getProductById(id) {
    const products = await this.getAllProducts();
    const product = products.find((prod) => prod.id == id);
    return product;
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path);
      return JSON.parse(data);
    } catch (err) {
      console.log('ERROR READING FILE');
    }
  }
}

module.exports = ProductManager;
