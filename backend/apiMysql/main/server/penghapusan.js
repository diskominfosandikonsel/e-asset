const express = require('express');
var db = require('../../../db/MySql/umum');
const fs = require('fs');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var halaman = 1;


    let jml_data = `
        SELECT penghapusan.*

        FROM e_aset.penghapusan penghapusan

        ORDER BY penghapusan.createAt DESC
    `

    let view = `
        SELECT penghapusan.*

        FROM e_aset.penghapusan penghapusan

        ORDER BY penghapusan.createAt DESC

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
            // ========================

        }
    })
});

router.post('/addData', upload.single("file"), (req,res)=>{
    console.log(req.body);
    var data = JSON.parse(req.body.data)
    var insert = '';

    insert = `INSERT INTO penghapusan (id, nama, nomor, tgl, keterangan, file, alasan, informasi, kode, asetId, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.nama+`' ,'`+data.nomor+`' ,'`+data.tgl+`' , '`+data.keterangan+`', '`+req.file.filename+`', '`+data.alasan+`', '`+data.informasi+`', '`+data.kode+`', '`+data.asetId+`','`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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

router.post('/editData', upload.single("file"), (req,res)=>{
    console.log(req.body);
    var data = JSON.parse(req.body.data)
    var query = '';
    if (!req.file) {
    query = `
        UPDATE penghapusan SET
        nama = '`+data.nama+`',
        nomor = '`+data.nomor+`',
        tgl = '`+data.tgl+`',
        keterangan = '`+data.keterangan+`',
        alasan = '`+data.alasan+`',
        informasi = '`+data.informasi+`',
        kode = '`+data.kode+`',
        asetId = '`+data.asetId+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
    } else {
        query = `
        UPDATE penghapusan SET
        nama = '`+data.nama+`',
        nomor = '`+data.nomor+`',
        tgl = '`+data.tgl+`',
        keterangan = '`+data.keterangan+`',
        file = '`+req.file.filename+`',
        alasan = '`+data.alasan+`',
        informasi = '`+data.informasi+`',
        kode = '`+data.kode+`',
        asetId = '`+data.asetId+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
        hapus_file(data.file_old);
    }
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
    var file = req.body.file
    hapus_file(file);
    var query = `
        DELETE FROM penghapusan WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

function hapus_file(file){
    const path = 'uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}

module.exports = router;