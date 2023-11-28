import { Router } from "express"
import CartManager from "../dao/database/CartManager.js"

const carts = new CartManager()
const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    const newCart = await carts.addCarts()

    return res.status(200).send({ status: 'OK'})
})

cartsRouter.get('/', async (req, res) => {
    return res.status(200).send(await carts.readCarts())
})

cartsRouter.get('/:id', async (req, res) => {
    return res.status(200).send(await carts.getCartById(req.params.id))
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    res.status(200).send(await carts.addProductInCart(cartId, productId))
})

export default cartsRouter