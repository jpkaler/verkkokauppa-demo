const express = require('express');
const res = require('express/lib/response');
const sqlite3 = require('sqlite3');

let app = express();                    //
app.use(express.json());                //kaikki menee expressin kautta

/* // Dummy Database
let tempDatabase = [{
    id:1,
    nimi:"farkut",
    hinta:19.99,
    kategoria:"housut"
},{
    id:2,
    nimi:"t-paita",
    hinta:29.99,
    kategoria:"paidat"
}]; */

// Product Database
const db = new sqlite3.Database('../tuotteet.db');

// GET -> koko tuotetietokanta
app.get("/verkkokauppa", (req,res) => {  // function(request,response) on sama kuin (req,res) =>
    
    db.all('SELECT * FROM tuotteet', (err, rows) => { 
        return res.status(200).json(rows);
    })

});

//GET -> kaikki kategoriat
app.get("/verkkokauppa/kategoriat", (req,res) => {
    db.all('SELECT KATEGORIA FROM tuotteet WHERE KATEGORIA NOT NULL GROUP BY KATEGORIA', (err, rows) => {
        return res.status(200).send(rows);
    })
})

//GET -> yhden kategorian tuotteet
app.get("/verkkokauppa/kategoriat/:category", (req,res) => {

    db.all('SELECT * FROM tuotteet WHERE KATEGORIA=$category', 
        {
            $category: req.params.category
        }, (err, rows) => {
            if (rows.length === 0) {
                return res.status(404).json({message: "Category not found"});
            } 
            return res.status(200).json(rows);
        })

})

// GET -> yksi tuote tietokannasta SQLite
app.get("/verkkokauppa/:productId", (req, res) => {
    
    db.get('SELECT * FROM tuotteet WHERE ID=$productId', // Käytetään SQL:ää tuotteen löytämiseksi
        {
            $productId: req.params.productId // Määritellään productId
        }, (err, row) => {
            if (!row) {
                return res.status(404).json({message: "Product not found"}); // Jos Id ei vastaa mitään tuotetta
            } 
            return res.status(200).json(row);
            
        })
})





//dev portti
let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);  // varmistusviesti

//npm init
//npm install express
//node server