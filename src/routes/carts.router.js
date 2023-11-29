import { Router } from "express"
import CartManager from "../dao/database/CartManager.js"

const carts = new CartManager()
const router = Router()

router.post('/', async (req, res) => {
    const newCart = await carts.addCarts()

    return res.status(200).send({ status: 'OK', data: newCart})
})

router.get('/', async (req, res) => {
    const cart = await carts.getCarts()

    return res.status(200).send({ status: 'OK', data: cart })
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const foundCart = await carts.getCartById(cid)

    return res.status(200).send({ status: 'OK', data: foundCart })

})

router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const { quantity } = req.body

    const result = await carts.addProductInCart(cartId, { _id: productId, quantity: quantity })

    return res.status(200).send({ message: `El producto ${productId} ha sido agregado al carrito`, cart: result})
})

export default router