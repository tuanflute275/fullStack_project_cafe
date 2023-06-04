import express from 'express'
const app = express()
import morgan from 'morgan'
import dotenv from 'dotenv'
import initRouterWeb from './routes/login.router'
import initCategory from './routes/category.router'
import initProduct from './routes/product.router'
import initDashboard from './routes/dashboard.router'
import initBill from './routes/bill.router'
dotenv.config()
const port = process.env.PORT

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ANGULAR_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//setup
app.use(morgan('tiny'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('src/public'))
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: true }))

//initRouterWeb
initRouterWeb(app)
//initCategory
initCategory(app)
//initProduct
initProduct(app)
//Dashboard
initDashboard(app)
//initBill
initBill(app)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})