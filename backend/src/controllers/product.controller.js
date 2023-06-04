import connection from '../config/connectDB'

let addProduct = (req, res) => {
    let product = req.body;
    let sql = "insert into product(name, categoryId, description,price,status) values (?, ?, ?, ?, ?)";
    connection.query(sql, [product.name, product.categoryId, product.description, product.price, product.status], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "product added successfully" })
        } else {
            res.status(500).json(err)
        }
    })
}

let getProduct = (req, res) => {
    let sql = "select p.id, p.name, p.description, p.price, p.status, c.id as CategoryId, c.name as categoryName from product as p inner join category as c where p.categoryId = c.id ";

    connection.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            res.status(500).json(err)
        }
    })
}

let getByCategory = (req, res) => {
    let id = req.params.id;
    let sql = "select id, name from product where categoryId = ? and status='true";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            res.status(500).json(err)
        }
    })
}

let getById = (req, res) => {
    let id = req.params.id;
    let sql = "select id, name, description, price from product where id=?";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0])
        }
        else {
            return res.status(500).json(err)
        }
    })
}

let updateProduct = (req, res) => {
    let product = req.body;
    let sql = "update product set name = ?, categoryId=?, description=?, price=? where id=?";
    connection.query(sql, [product.name, product.categoryId, product.description, product.price], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            } else {
                return res.status(200).json({ message: "Product updated successfully" })
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
}

let updateStatus = (req, res) => {
    let user = req.body;
    let sql = "update product set status=? where id=?";
    connection.query(sql, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            }
            else {
                return res.status(200).json({ message: "Product status updated successfully" })
            }
        } else {
            return res.status(500).json(err)
        }
    })
}

let deleteProduct = (req, res) => {
    const id = req.params.id;
    let sql = "delete from product where id=?";
    connection.query(sql, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product not found" })
            } else {
                return res.status(200).json({ message: "delete product successfully" })
            }
        } else {
            res.status(500).json(err)
        }
    })
}


module.exports = {
    addProduct,
    getProduct,
    getByCategory,
    getById,
    updateProduct,
    updateStatus,
    deleteProduct
}