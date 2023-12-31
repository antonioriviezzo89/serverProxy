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

app.post('/makeProxy', (req, res)=>{
        const reqValues = req.body;
        let urlToBeProxy = reqValues.urlData;
        axios({
            method: 'GET',
            url: urlToBeProxy,
            withCredentials: false,
            crossdomain: true,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Cache-Control": "max-age=0",                
              }
        })
        //.get(urlToBeProxy)
            .then(function (response) {
                res.setHeader("Content-Type", "application/json;charset=UTF-8");
                res.writeHead(200);
                res.end(JSON.stringify(response.data, null, 3));
        })
        .catch((err) => {            
            //console.log(err);
            res.setHeader("Content-Type", "application/json;charset=UTF-8");
            res.writeHead(200);
            res.end(JSON.stringify(JSON.parse(`{"error":"${err}"}`), null, 3));
        });
    
})

