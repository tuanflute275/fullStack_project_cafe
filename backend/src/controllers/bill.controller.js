import connection from '../config/connectDB'
import ejs from 'ejs'
import pdf from 'html-pdf'
import path from 'path'
import fs from 'fs'
import { v1 as uuidv1 } from 'uuid';

let generateReport = (req, res) => {
    const generateUuid = uuidv1()
    const orderDetails = req.body;
    const productDetailsReport = JSON.parse(orderDetails.productDetails);

    let sql = "insert into bill (name, uuid, email, contactNumber, paymentMethod,total, productDetails,createBy) values (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [orderDetails.name, generateUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, "report.ejs"), { productDetails: productDetailsReport, name: orderDetails.name, email: orderDetails.email, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount }, (err, results) => {
                if (err) {
                    return res.status(500).json(err)
                }
                else {
                    pdf.create(results).toFile(path.join(__dirname + '' + '/generated') + generateUuid + ".pdf", (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err)
                        } else {
                            return res.status(200).json({ uuid: generateUuid });
                        }
                    })
                }
            })
        }
        else {
            return res.status(500).json(err)
        }
    })
}

let getPdf = (req, res) => {
    const orderDetails = req.body;
    const pdfPath = path.join(__dirname + '' + '/generated') + orderDetails.uuid + ".pdf";
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res)
    } else {
        let productDetailsReport = JSON.parse(orderDetails);
        ejs.renderFile(path.join(__dirname, "report.ejs"), { productDetails: productDetailsReport, name: orderDetails.name, email: orderDetails.email, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount }, (err, results) => {
            if (err) {
                return res.status(500).json(err)
            }
            else {
                pdf.create(results).toFile(path.join(__dirname + '' + '/generated') + orderDetails.uuid + ".pdf", (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err)
                    } else {
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
}

let getBill = (req, res)=>{
    let sql = "select * from bill order by id desc";
    connection.query(sql, (err, results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err)
        }
    })
}

let deleteBill = (req, res)=>{
    const id  = req.params.id;
    let sql = "delete from bill where id=?";
    connection.query(sql,[id], (err, results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Bill not found"})
            }else{
                return res.status(200).json({message:"Bill deleted successfully"})
            }
        }else{
            return res.status(500).json(err)
        }
    })
}

module.exports = {
    generateReport,
    getPdf,
    getBill,
    deleteBill
}
