import express from 'express'
const router = express.Router()
import billController from '../controllers/bill.controller'
import auth from '../services/authentication.js'

let initBill = (app)=>{
    router.post('/generateReport',auth.authentication, billController.generateReport)
    router.post('/getPdf',auth.authentication, billController.getPdf)
    router.get('/getBills',auth.authentication, billController.getBill)
    router.delete('/delete/:id',auth.authentication, billController.deleteBill)


    return app.use('/bill', router)
}

export default initBill;
