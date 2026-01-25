const express = require('express');
var db = require('../../../../db/MySql/umum');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 

    let jml_data = `
        SELECT 
        hak.*

        FROM e_aset.master_hak hak 
        
        WHERE 

        hak.uraian LIKE '%`+cari+`%'

    `
    
    let view = `
        SELECT 
        hak.*

        FROM e_aset.master_hak hak 
        
        WHERE 

        hak.uraian LIKE '%`+cari+`%'

        ORDER BY hak.uraian ASC
        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })

        }
    })
});

router.post('/addData', (req,res)=>{
    console.log(req.body);
    var insert = '';

    insert = `INSERT INTO master_hak (id, uraian, keterangan, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+req.body.uraian+`' ,'`+req.body.keterangan+`' ,'`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
        `;

    db.query(insert, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
});

router.post('/editData', (req,res)=>{
    // var data = JSON.parse(req.body.data)
    var query = '';

        query = `
        UPDATE master_hak SET
        uraian = '`+req.body.uraian+`',
        keterangan = '`+req.body.keterangan+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+req.body.id+`'
        `;
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
})

router.post('/removeData', (req, res)=> {

    var query = `
        DELETE FROM master_hak WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

module.exports = router;