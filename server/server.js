const express = require('express')
const server = express()

server.get("/",(req,res)=>{
    res.send("server running")
});

server.get("/api/locations",(req,res)=>{
    res.json([
        {name : "crater", type : "location"},
        {name : "waterice", type : "location"}
    ]);
});

server.listen(3000)