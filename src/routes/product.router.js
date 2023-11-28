import { Router } from 'express'
import ProductManager from '../dao/database/ProductManager.js'
import { uploader } from '../uploader.js'

const product = new ProductManager()
const router = Router()

router.get("/", async (req, res) => {
  const products = parseInt(req.query.limit)
  if (!products) {
    return res.status(200).send({ status: 'OK', data: await product.getProducts() })
  }

  const allProducts = await product.getProducts()
  const limitProduct = allProducts.slice(0, products)

  return res.status(200).send({ status: 'OK', data: limitProduct })
})

router.get("/:pid", async (req, res) => {
  const productById = await product.getProductbyId(req.params.pid)

  return res.status(200).send({ status: 'OK', data: productById })
})

router.post("/", uploader.single('thumbnail'), async (req, res) => {
  // const newProduct = req.body

  // return res.status(200).send(await product.addProduct(newProduct))
    if (!req.file) return res.status(400).send({ status: 'FIL', data: 'No se pudo subir el archivo' })

    const { title, description, price, category, status, code, stock } = req.body
    if (!title || !description || !price || !category || !status || !code || !stock) {
        return res.status(400).send({ status: 'ERR', data: 'Debes proporcionar todos los campos completos. Todos los valores son obligatorios.' })
    }

    const newProduct = {
        title,
        description,
        price,
        category,
        status,
        // el obj req.file está disponible porque estamos utilizando Multer como middleware,
        // mediante el objeto uploader que estamos importando e inyectando.
        thumbnail: req.file.filename,
        code,
        stock
    }

    const result = await product.addProduct(newProduct)
    res.status(200).send({ status: 'OK', data: result })
})

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid
  const objModif = req.body
  const productUpdated = await product.updateProduct(pid, objModif)

  return res.status(200).send({ status: 'OK', data: productUpdated })
})

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid
  const productDelete = await product.deleteProductById(pid)

  return res.status(200).send({ status: 'OK', data: productDelete })
})

export default router