import connection from '../config/connectDB'

let getDetail = (req, res) => {
    let categoryCount;
    let productCount;
    let billCount;
    let sql = "select count(id) as categoryCount from category";
    connection.query(sql, (err, results)=>{
        if(!err){
            categoryCount = results[0].categoryCount;
        }else{
            return res.status(500).json(err)
        }
    })

    let query = "select count(id) as productCount from product";
    connection.query(query, (err, results)=>{
        if(!err){
            productCount = results[0].productCount;
        }else{
            return res.status(500).json(err)
        }
    })

    let query2 = "select count(id) as billCount from bill";
    connection.query(query2, (err, results)=>{
        if(!err){
            billCount = results[0].billCount;
            var data = {
                category: categoryCount,
                product:productCount,
                bill:billCount
            };
            return res.status(200).json(data)
        }else{
            return res.status(500).json(err)
        }
    })
}




module.exports = {
    getDetail
}