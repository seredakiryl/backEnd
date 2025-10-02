"use strict";
// import express,{Request,Response} from 'express'
//
// const app = express()
// const port = 3000
//
// app.get('/', (req:Request, res:Response) => {
//     let message ='kiryl 22'
//     res.send(message)
// })
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5003;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
const addresses = [{ id: 1, value: 'Nezalejnasti 12' }, { id: 2, value: 'Selickaga 11' }];
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.post('/products', (req, res) => {
    const product = {
        id: +new Date(),
        title: req.body.title
    };
    products.push(product);
    res.status(201).send(product);
});
app.get('/products/:id', (req, res) => {
    let product = products.find(item => item.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send('Product not found');
    }
});
app.put('/products/:id', (req, res) => {
    let product = products.find(item => item.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
        res.status(200).send(product);
    }
    else {
        res.status(404).send('Product not found');
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.status(404);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(item => item.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.status(404).send('Address not found');
    }
});
app.listen(port, () => {
    console.log('Example app listening on port: ${port}');
});
