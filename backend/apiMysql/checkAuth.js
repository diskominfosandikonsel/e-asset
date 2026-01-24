const express = require('express');
const router = express.Router();

var db = require('../db/MySql/umum');


router.post('/', (req, res)=>{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.send("OK")

})

router.get('/', (req, res)=>{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.json("OK")

})

module.exports = router;
