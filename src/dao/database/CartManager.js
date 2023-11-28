import cartModel from '../models/carts.model.js'
//import ProductManager from './ProductManager.js'
//lo importo para poder ver lo que los carritos incluyan

//const products = new ProductManager()
class CartManager{
    constructor() {
    }

    //leer los carritos
    readCarts = async () => {
        try {
            const carts = await cartModel.find().lean()
            return carts
        } catch (err) {
            return console.error(err)
        }
    }

    getCarts = async () => {
        try {
            return await this.readCarts()
        } catch (err) {
            return console.error(err)
        }
    }

    //obtener el carrito según su id
    getCartById = async (cid) => {
        try {
            const cartById = await cartModel.findById(id)
            if(!cartById) {
                return "Ese carrito no existe"
            } else {
                return cartById
            }
        } catch (err) {
            return console.error(err)
        }
    }
    
    // //buscar existencia según su id
    // exist = async (cid) => {
    //     try {
    //         const carts = await this.readCarts()
    //         const findCart = carts.find(cart => cart.id === cid)

    //         return findCart
    //     } catch (err) {
    //         return console.error(err)
    //     }
    // }

    // //escribir en el carrito
    // writeCarts = async (carts) => {
    //     try {
    //         const write = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))

    //         return write
    //     } catch (err) {
    //         return console.error(err)
    //     }
    // }
    
    // //Generar id autoincrementable
    // generateCartId = async () => {
    //     try {
    //         if (fs.existsSync(this.path)) {
    //         //busco la existencia de ésta ruta con éste método predeterminado
    //             const cartList = await this.readCarts()
    //             const counter = cartList.length
    //             if (counter == 0) {
    //                 return 1
    //             } else {
    //                 return cartList[counter - 1 ].id + 1
    //             }
    //         }
    //     } catch (err) {
    //         return console.error(err)
    //     }
    // }

    //crear carrito
    addCarts = async (products) => {
        try {            
            let cartProducts = {}
            if (products && products.length > 0) {
                cartProducts.products = products
            } 
            await cartModel.create(cartProducts)
        } catch (err) {
            return console.error(err)
        }
    }

    //agregar producto en carrito
    addProductInCart = async (cartId, productId) => {
        try {
            const filter = { _id: cartId, "products._id": productId._id }
            const cart = await cartModel.findById(cartId)
            const findProduct = cart.products.some((product) => product._id.toString() === productId._id)

            if (findProduct) {
                const update = { $inc: { "products.$.quantity": productId.quantity } }
                await cartModel.updateOne(filter, update)
            } else {
                const update = { $push: { products: { _id: productId._id, quantity: productId.quantity } } }
                await cartModel.updateOne({ _id: cartId }, update)
            }
            return await cartModel.findById(cartId)
        } catch (err) {
            return console.error(`Error al agregar el producto al carrito`)
            return err
        }
    }
}

//const carts = new CartManager()
//carts.addCarts()
//carts.getCartById(1)

export default CartManager