import productModel from '../models/products.model.js'

class ProductManager {
    constructor() {
    }

    //Creación de producto
    addProduct = async (obj) => {
        try {
            return await productModel.create(product)
        } catch (err) {
            return console.error(err)
        }
    }
    
    //leer productos
    readProducts = async () => {
        try {
            return await productModel.find().lean()
        } catch (err) {
            return console.error(err)
        }
    }

    //Objetener todos los productos
    getProducts = async () => {
        try {
            const products = await this.readProducts()
            return products
        } catch (err) {
            return console.error(err)
        }
    }

    //Obtener productos según su id
    getProductbyId = async (id) => {
        try {
            const productById = await productModel.findById(id)
            if(!productById) {
                return "Ese producto no existe"
            } else {
                return productById
            }
        } catch (err) {
            return console.error(err)
        }
    }
  
    //con bd no se necesita generar id
    // //Generar id autoincrementable
    // generateId = async () => {
    //     try {
    //         if (fs.existsSync(this.path)) {
    //         //busco la existencia de ésta ruta con éste método predeterminado de node
    //         const productList = await this.readProducts()
    //         const counter = productList.length
    //             if (counter == 0) {
    //                 return 1
    //             } else {
    //                 return productList[counter - 1 ].id + 1
    //             }
    //             }
    //     } catch (err) {
    //         return console.error(err)
    //     }
    // }

    //Borrar producto según su id
    deleteProductById = async (id) => {
        try {
            const productDetected = await productModel.findByIdAndDelete(id)
            return productDetected
        } catch (err) {
            return console.error(err)
        }
    }

    //Actualizar productos según su id
    updateProduct = async (id, product) => {
        try {
            const productDetected = await productModel.findByIdAndUpdate(id, product)
            return productDetected
        } catch (error) {
            return console.error(error)
        }
    }
}

export default ProductManager