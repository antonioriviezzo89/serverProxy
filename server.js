var http = require('http');
var axios = require('axios');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

/*
//example url
var url = `https://it.soccerway.com/a/block_competition_tables?`
    url += `block_id=page_competition_1_block_competition_tables_11`
    url += `&callback_params={"season_id":"23480", "round_id":"76333", "outgroup":"", "competition_id":"70", "new_design_callback":"1"}`
    url += `&action=changeTable&params={"type":"competition_wide_table"}`;   
*/

var porta = process.env.PORT || 3000;
//porta = 443;
console.log("porta: " + porta);


app.listen(porta, () => {
    console.log(`Sever is now listening ${porta}`);
});


//utils for restfull api of type post
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/makeProxy', async (req, res)=>{
        const reqValues = req.body;
        let urlToBeProxy = reqValues.urlData;
        axios.get(urlToBeProxy, 
            { headers: {
                "User-agent": "PostmanRuntime/7.32.3",
                "Accept": "*/*",
                "Postman-Token": "8256bc82-e8ca-4c91-91b3-c056a9fde3f0",
                "Host": "it.soccerway.com",
                "Origin": "it.soccerway.com"
            }})
            .then(function (response) {
                res.setHeader("Content-Type", "application/json;charset=UTF-8");
                res.writeHead(200);
                res.end(JSON.stringify(response.data, null, 3));
        })
        .catch((err) => {            
            console.log(err);
            res.setHeader("Content-Type", "application/json;charset=UTF-8");
            res.writeHead(200);
            res.end(JSON.stringify(JSON.parse(`{"error":"${err}"}`), null, 3));
        });
    
})

