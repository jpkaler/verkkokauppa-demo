const express = require('express');
const res = require('express/lib/response');

let app = express();                    //
app.use(express.json());                //kaikki menee expressin kautta

//dummy database
let database = [];
let id = 1;

app.get("/api/verkkokauppa", (req,res) => {         // function(request,response) on sama kuin (req,res) =>
    return res.status(200).json(database);          
});

//dev portti
let port = process.env.PORT || 3001;
app.listen(port);

console.log("Running in port",port);  // varmistusviesti

//npm init
//npm install express
//node server