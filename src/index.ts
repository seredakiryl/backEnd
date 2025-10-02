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

import express, { Request, Response } from 'express'
 import bodyParser from "body-parser";


const app = express()

const port = process.env.PORT || 5003

const products = [{id:1,title: 'tomato'}, {id:2,title: 'orange'}]
const addresses = [{id:1,value: 'Nezalejnasti 12'}, {id:2,value: 'Selickaga 11'}]


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/products', (req: Request, res: Response ) => {
    if (req.query.title ){

        let searchString=req.query.title.toString()
        res.send(products.filter(p =>p.title.indexOf(searchString) >-1))
    }else {
        res.send(products)
    }
})

app.post('/products', (req: Request, res: Response ) => {
   const product = {
       id:+new Date(),
       title:req.body.title
   }

   products.push(product)
    res.status(201).send(product)
})

app.get('/products/:id', (req: Request, res: Response ) => {

    let product =products.find(item=>item.id === +req.params.id)

    if (product){
        res.send(product)
    } else {
        res.status(404).send('Product not found')
    }
})

app.put('/products/:id', (req: Request, res: Response ) => {

    let product =products.find(item=>item.id === +req.params.id)

    if (product){
        product.title = req.body.title
        res.send(product)
        res.status(200).send(product)
    } else {
        res.status(404).send('Product not found')
    }
})

app.delete('/products/:id', (req: Request, res: Response ) => {

    for (let i=0; i<products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }

    res.status(404)

})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
    const address =addresses.find(item=>item.id === +req.params.id)

    if (address){
        res.send(address)
    } else {
        res.status(404).send('Address not found')
    }

})

app.listen(port, () => {
    console.log('Example app listening on port: ${port}')
})

