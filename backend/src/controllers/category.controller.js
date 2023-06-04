import connection from '../config/connectDB'


let addCategory = (req, res) => {
    let category = req.body;
    let sql = "insert into category(name) values (?)";
    connection.query(sql, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "category added successfully" })
        } else {
            res.status(500).json(err)
        }
    })
}

let getCategory = (req, res) => {
    let sql = "select * from category order by name asc";
    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            res.status(500).json(err)
        }
    })
}


let updateCategory = (req, res)=>{
    let product = req.body;
    console.log(product.name, product.id);
    let sql = "update category set name = ? where id = ?";
    connection.query(sql, [product.name, product.id], (err, results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"category not found"})
            }
            return res.status(200).json({message:"category updated successfully"})
        }else{
            res.status(500).json(err)
        }
    })
}

module.exports = {
    addCategory,
    getCategory,
    updateCategory
}