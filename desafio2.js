class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this._id = Product.id++;
    }

    static id = 1;

}

class ProductManager {

    constructor() {
        this.products = []
    }

    isCodeUnique(code) {
        return !this.products.some(product => product.code === code);
    }

    validateProduct(product) {
        return product.title && product.description && product.price && product.thumbnail && product.code && product.stock !== undefined;
    }

    addProduct(product) {

        if (!this.isCodeUnique(product.code) || !this.validateProduct(product)) {
            console.log("Not found")
        }

        this.products.push(product)
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const foundProduct = this.products.find(product => product._id === id);
        if (foundProduct) {
            return foundProduct;
        } else {
            console.log("Not found");
            return null;
        }
    }

    deleteProduct(id) {
        const clear = this.products.findIndex(product => product._id === id);
        if (clear !== -1) {
            this.products.splice(clear, 1);
            this.updateProduct();
            console.log(`Se ha borrado el producto con ID: ${id}`);
        } else {
            console.log(`El producto con ID ${id} no se encuentra`);
        }
    }

    updateProduct() {
        this.products.forEach((product, index) => {
            product._id = index + 1;
        });
    }

}

const productManager = new ProductManager();

const product1 = new Product("title1", "description1", 2000, "thumbnail1", "code1", 6)
const product2 = new Product("title2", "description2", 4000, "thumbnail2", "code2", 10)
const product3 = new Product("title3", "description3", 6000, "thumbnail3", "code3", 4)
const product4 = new Product("title4", "description4", 8000, "thumbnail4", "code4", 7)

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productToFindId = 4;
const foundProduct = productManager.getProductById(productToFindId);
if (foundProduct) {
    console.log("Producto encontrado:", foundProduct);
}

const productToDeleteId = 2;
productManager.deleteProduct(productToDeleteId);

const newProductId = 1;
productManager.updateProduct(newProductId);

console.log("Después de eliminar:", productManager.getProducts());