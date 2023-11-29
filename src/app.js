import express from "express"
import mongoose from "mongoose"
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars"
import viewsRouter from './routes/views.router.js'
//import ProductManager from "./components/ProductManager.js"
import { Server } from "socket.io"
import { __dirname } from "./utils.js"

const app = express()
const PORT = 8080
//const productManager = new ProductManager("/files/products.json")
const MONGOOSE_URL = 'mongodb+srv://ivyaguilar07:bjLpjWzJQGdcrVRL@cluster0.2olteyc.mongodb.net/ecommerce'

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en puerto ${PORT}`)
})

try {
    await mongoose.connect(MONGOOSE_URL)
    // app.listen(PORT, () => {
    //     console.log(`Servidor Express ejecutándose en puerto ${PORT}`)
    // })
    httpServer
} catch (err) {
    console.log(`No se puede conectar con las bases de datos (${err.message})`)
}

const socketServer = new Server(httpServer)

//middleware a nivel app, capta errores
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Algo falló')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use('/', viewsRouter)

//app.use(express.static('./src/public'))
app.use('/static', express.static(`${__dirname}/public`))

// socketServer.on('connection', async (socket) => {
//     console.log('Cliente conectado con id:', socket.id)
//     const productsArray = await productManager.getProducts({})
//     socketServer.emit('enviarproducts', productsArray)

//     socket.on('addProduct', async (obj) => {
//         await productManager.addProduct(obj)
//         const updatedProducts = await productManager.getProducts({})
//     socketServer.emit('productsupdated', updatedProducts)
//     })

//     socket.on('deleteProduct', async (id) => {
//         await productManager.deleteProductById(id)
//         const newProductList = await productManager.getProducts({})
//     socketServer.emit('productsupdated', newProductList)
//     })
// })