import { Router } from 'express'
import ProductManager from '../dao/database/ProductManager.js'
import { uploader } from '../uploader.js'

const product = new ProductManager()
const router = Router()

router.get("/", async (req, res) => {
  const allProducts = await product.getProducts()

  res.status(200).send({ status: 'OK', data: allProducts })
})

router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.id)
    if (!id) {
        return res.status(404).send(`El producto no existe`)
    } 
    const allProducts = await product.getProducts()
    const productById = allProducts.find(p => p.id === id)

    res.status(200).send(productById)
})

router.post("/", uploader.single('thumbnail'), async (req, res) => {
  const newProduct = req.body

  return res.status(200).send(await product.addProduct(newProduct))
})

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const updateProduct = req.body

  return res.status(200).send(await product.updateProduct(id, updateProduct))
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  return res.status(200).send(await product.deleteProduct(id))
})

export default router