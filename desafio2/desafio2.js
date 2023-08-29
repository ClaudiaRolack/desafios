import { promises as fs } from "fs";

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
        this.path = "./products.txt";
        this.products = [];
    }

    addProduct = async (product) => {

        this.products.push(product)

        try {
            const content = JSON.stringify(this.products);
            await fs.writeFile(this.path, content);
            console.log("Producto agregado:", product);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }

    }

    readFileProducts = async () => {
        let answers = await fs.readFile(this.path, "utf-8");
        return JSON.parse(answers);
    }

    getProducts = async () => {
        let answerGetProduct = await this.readFileProducts();
        return console.log(answerGetProduct);
    }

    findId = async (id) => {
        let answerByID = await this.readFileProducts();
        return answerByID.find(product => product._id === id);
    }

    getProductById = async (id) => {
        const foundProduct = await this.findId(id);  
       !foundProduct ? console.log("Producto no encontrado") : console.log(foundProduct);
    }

    deleteProductById = async (id) => {
        let answerDelete = await this.readFileProducts();
        let productFilter = answerDelete.filter((product) => product._id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto elimidado");
    }

    updateProduct = async ({id, ...product}) => {
       await this.deleteProductById(id);
       let productOld = await this.readFileProducts();
       let modifiedProduct = [
        {...product, id},
        ...productOld
       ];
       await fs.writeFile(this.path, JSON.stringify(modifiedProduct));
    }

}

const productManager = new ProductManager();

// const product1 = new Product("title1", "description1", 2000, "thumbnail1", "code1", 6);
// const product2 = new Product("title2", "description2", 4000, "thumbnail2", "code2", 10);
// const product3 = new Product("title3", "description3", 6000, "thumbnail3", "code3", 4);
// const product4 = new Product("title4", "description4", 8000, "thumbnail4", "code4", 7);

// productManager.addProduct(product1);
// productManager.addProduct(product2);
// productManager.addProduct(product3);
// productManager.addProduct(product4);

// productManager.getProducts();

// productManager.getProductById(2)

// productManager.deleteProductById(2)

// productManager.updateProduct({
//         title: 'title2',
//         description: 'description2',
//         price: 4000,
//         thumbnail: 'thumbnail2',
//         code: 'code2',
//         stock: 10,
//         _id: 2
//       })
