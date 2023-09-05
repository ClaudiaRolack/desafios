import express from "express";
import ProductManager from "./componentes/desafio3.js";

const app = express();

app.use(express.urlencoded({extended: true}));

const product = new ProductManager();
const readProducts = product.readFileProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:pid", async (req, res) => {
    try {
        let id = parseInt(req.params.pid);
        let allProducts = await readProducts; 
        let productById = allProducts.find(product => product._id === id);
        res.send(productById);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Interno del Servidor");
    }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error del servidor ${error}`));