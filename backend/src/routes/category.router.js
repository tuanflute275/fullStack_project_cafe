import express from 'express'
const router = express.Router()
import categoryController from '../controllers/category.controller'
import auth from '../services/authentication.js'
import checkRole from '../services/checkRole'

let initCategory = (app)=>{
    router.post('/add',auth.authentication,checkRole.checkRole, categoryController.addCategory)
    router.get('/get',auth.authentication, categoryController.getCategory)
    router.patch('/update', auth.authentication,checkRole.checkRole, categoryController.updateCategory)


    return app.use('/category', router)
}

export default initCategory;