const express = require('express');
const sqlite3 = require('sqlite3');

// Router
orderRouter = express.Router();

// Database
const db = new sqlite3.Database('../mockproducts.db');

// GET -> All orders from current user
orderRouter.get("/", (req,res) => {
    if (!req.user) {
        return res.status(401).json({message: "No user currently logged in."});
    }
    db.all('SELECT ID, total, orderedProducts, orderDate FROM orders WHERE userID = $userID', {
        $userID: req.user.ID
    },
    (err, rows) => {
        if (!rows[0]) {
            return res.status(400).json({message: "No orders for current user"});
        }
        return res.status(200).json(rows);
    })
})

// POST -> Add new order to database
orderRouter.post("/", (req,res) => {
    if (!req.user) {
        return res.status(401).json({message: "No user currently logged in."});
    }
    db.run('INSERT INTO orders (total, orderedProducts, userID, orderDate) VALUES ($total, $orderedProducts, $userID, $orderDate)', {
        $total: req.body.total,
        $orderedProducts: req.body.orderedProducts,
        $userID: req.user.ID,
        $orderDate: req.body.time
    }, (err) => {
        if (err) {
            res.status(409).json({message: "Invalid values"});
        } else {
            res.status(201).json({message: `New order added to the database for user ${req.user.username}`});
        }
    })
})


module.exports = orderRouter;