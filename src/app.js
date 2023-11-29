import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { __dirname } from "./utils.js"

import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/carts.router.js"
import viewsRouter from './routes/views.router.js'
//importo la nueva ubicación de los sockets products
import socketProducts from './socket/socketProduct.js'
import socketChat from './socket/socketChat.js'

const app = express()
const PORT = 8080

const MONGOOSE_URL = 'mongodb+srv://ivyaguilar07:bjLpjWzJQGdcrVRL@cluster0.2olteyc.mongodb.net/ecommerce'

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en puerto ${PORT}`)
})

try {
    await mongoose.connect(MONGOOSE_URL)
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

//app.use(express.static('./src/public'))
app.use('/static', express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use('/', viewsRouter)

//pasaré las conecciones socket a una nueva carpeta 
socketProducts(socketServer)
socketChat(socketServer)

