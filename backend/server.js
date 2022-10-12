const express = require('express');
const res = require('express/lib/response');

let app = express();                    //
app.use(express.json());                //kaikki menee expressin kautta

//dummy database
let database = [{
    id:1,
    nimi:"farkut",
    hinta:19.99,
    kategoria:"housut"
},{
    id:2,
    nimi:"t-paita",
    hinta:29.99,
    kategoria:"paidat"
}];

// GET -> koko tuotetietokanta
app.get("/api/verkkokauppa", (req,res) => {         // function(request,response) on sama kuin (req,res) =>
    return res.status(200).json(database);          
});

// GET -> yksi tuote tietokannasta
app.get("/api/verkkokauppa/:productId", (req, res) => {
    const foundItem = database.find((product) => product.id === Number(req.params.productId)); // Tallentaa tuotteen muuttujaan 'foundItem', jos id löytyy tietokannasta
    if (foundItem) {
        return res.status(200).json(foundItem); // Palauttaa tuotteen
    } else {
        return res.status(404).json({Message:"Item not found"});
    }
})

//dev portti
let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);  // varmistusviesti

//npm init
//npm install express
//node server