var http = require('http');
var axios = require('axios');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

//rivaserver.c1.is

/*
//example url
var url = `https://it.soccerway.com/a/block_competition_tables?`
    url += `block_id=page_competition_1_block_competition_tables_11`
    url += `&callback_params={"season_id":"23480", "round_id":"76333", "outgroup":"", "competition_id":"70", "new_design_callback":"1"}`
    url += `&action=changeTable&params={"type":"competition_wide_table"}`;   
*/

app.listen(3000, ()=>{
    console.log(`Sever is now listening`);
});

//utils for restfull api of type post
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/makeProxy', (req, res)=>{
    try {
        const reqValues = req.body;
        let urlToBeProxy = reqValues.urlData; 
        axios.get(urlToBeProxy)
            .then(function (response) {
                res.setHeader("Content-Type", "application/json;charset=UTF-8");
                res.writeHead(200);
                res.end(JSON.stringify(response.data, null, 3));
        });
    } catch (error){
        console.log(error)
    }
    
})

