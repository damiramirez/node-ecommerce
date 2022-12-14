class ProductManager {
  products;
  static idProduct = 1;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('All fields are required');
      }

      const product = this.products.find((prod) => prod.code === code);
      if (product) {
        throw new Error('The product code is repeated');
      }

      this.products.push({
        id: ProductManager.idProduct++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    try {
      const product = this.products.find((prod) => prod.id === id);
      if (!product) {
        throw new Error('ID not found');
      }

      return product;
    } catch (err) {
      return err;
    }
  }
}
