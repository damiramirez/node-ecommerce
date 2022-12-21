const fs = require('fs');

class ProductManager {
  products;
  static idProduct = 1;

  constructor(path) {
    this.path = path;
    this.products = this.readFile();
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

      const newProduct = {
        id: ProductManager.idProduct++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);
      this.writeFile(this.products);
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

  updateProduct(id, updateProd) {
    try {
      this.products = this.products.map((prod) => {
        if (prod.id === id) {
          return {
            ...prod,
            title: updateProd.title,
            description: updateProd.description,
            price: updateProd.price,
            thumbnail: updateProd.thumbnail,
            code: updateProd.code,
            stock: updateProd.stock,
          };
        }
        return prod;
      });
      this.writeFile(this.products);
    } catch (err) {
      throw new Error(err);
    }
  }

  deleteProduct(id) {
    try {
      this.products = this.products.filter((prod) => prod.id !== id);
      this.writeFile(this.products);
    } catch (err) {
      console.log(err);
    }
  }

  writeFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products));
    } catch (err) {
      throw new Error(err);
    }
  }

  readFile() {
    try {
      const products = fs.existsSync(this.path)
        ? JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        : [];
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }
}

//Testeo
const pm = new ProductManager('./products.json');

console.log(pm.getProducts());

pm.addProduct(
  'Producto de prueba',
  'Esto es una prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
console.log(pm.getProducts());

console.log('Mostrar producto ID 1');
console.log(pm.getProductById(1));

console.log('Updatear producto ID 1');
pm.updateProduct(1, {
  title: 'Updateo producto de prueba',
  description: 'TEST',
  price: 200,
  thumbnail: 'aaaa.png',
  code: '002',
  stock: 10,
});
console.log(pm.getProducts());

console.log('Borrar ID 1');
pm.deleteProduct(1);
console.log(pm.getProducts());
