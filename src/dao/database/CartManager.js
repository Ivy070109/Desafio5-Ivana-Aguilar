import cartModel from '../models/carts.model.js'

class CartManager {
    constructor() {
    }

    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean()
            return carts
        } catch (err) {
            return console.error(err)
        }
    }

    //obtener el carrito según su id
    getCartById = async (cid) => {
        try {
            const cartId = await cartModel.findById(cid)
            return cartId 
        } catch (err) {
            return console.error(err)
        }
    }
    
    //crear carrito
    addCarts = async (products) => {
        try {
            let cartProducts = {}
            if (products && products.length > 0) {
                cartProducts.products = products
            }
            await cartModel.create(cartProducts)
        } catch (error) {
            return error('Carrito agregado')
        }
    }
    
    //agregar producto en carrito
    addProductInCart = async (cartId, productId) => {
        try {
            const filter = { _id: cartId, "products._id": productId._id }
            const cart = await cartModel.findById(cartId);
            const findProduct = cart.products.some((product) => product._id.toString() === productId._id);
    
            if (findProduct) {
                const update = { $inc: { "products.$.quantity": productId.quantity } }
                await cartModel.updateOne(filter, update);
            } else {
                const update = { $push: { products: { _id: productId._id, quantity: productId.quantity } } }
                await cartModel.updateOne({ _id: cartId }, update)
            }
            return await cartModel.findById(cartId)
        } catch (error) {
            console.error('Error al agregar el producto al carrito')
            return error
        }
    }
}

//const carts = new CartManager()
//carts.addCarts()
//carts.getCartById(1)

export default CartManager