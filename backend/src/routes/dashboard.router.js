import express from 'express'
const router = express.Router()
import dashboardController from '../controllers/dashboard.controller'
import auth from '../services/authentication.js'
import checkRole from '../services/checkRole'

let initDashboard = (app)=>{
    router.get('/details',auth.authentication, dashboardController.getDetail)

    return app.use('/dashboard', router)
}

export default initDashboard;
