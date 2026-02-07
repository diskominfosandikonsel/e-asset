const express = require('express');
var db = require('../../../db/MySql/umum');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var halaman = 1;


    let jml_data = `
        SELECT aset.*

        FROM e_aset.aset aset

        WHERE aset.pengadaanId = '`+req.body.pengadaanId+`'
        
        ORDER BY aset.createAt DESC
    `

    let view = `
        SELECT aset.*

        FROM e_aset.aset aset

        WHERE aset.pengadaanId = '`+req.body.pengadaanId+`'
        
        ORDER BY aset.createAt DESC
        
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

router.post('/addData', (req,res)=>{
    console.log(req.body);
    var data = req.body;
    var insert = '';

    insert = `INSERT INTO aset (id, pengadaanId, nomor, akunId, kelompokId, jenisId, objekId, rincianId, subId, subSubId, merk, type, ukuran, luas, panjang, lebar, jumlah, harga, keterangan, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.pengadaanId+`' ,'`+data.nomor+`' ,'`+data.akunId+`' ,'`+data.kelompokId+`' ,'`+data.jenisId+`' ,'`+data.objekId+`' ,'`+data.rincianId+`' ,'`+data.subId+`' ,'`+data.subSubId+`' ,'`+data.merk+`' ,'`+data.type+`' ,'`+data.ukuran+`' ,'`+data.luas+`' ,'`+data.panjang+`' ,'`+data.lebar+`' ,'`+data.jumlah+`' ,'`+data.harga+`' ,'`+data.keterangan+`' ,'`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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
    console.log(req.body);
    var data = req.body;
    var query = '';
    query = `
        UPDATE aset SET
        pengadaanId = '`+data.pengadaanId+`',
        nomor = '`+data.nomor+`',
        akunId = '`+data.akunId+`',
        kelompokId = '`+data.kelompokId+`',
        jenisId = '`+data.jenisId+`',
        objekId = '`+data.objekId+`',
        rincianId = '`+data.rincianId+`',
        subId = '`+data.subId+`',
        subSubId = '`+data.subSubId+`',
        merk = '`+data.merk+`',
        type = '`+data.type+`',
        ukuran = '`+data.ukuran+`',
        luas = '`+data.luas+`',
        panjang = '`+data.panjang+`',
        lebar = '`+data.lebar+`',
        jumlah = '`+data.jumlah+`',
        harga = '`+data.harga+`',
        keterangan = '`+data.keterangan+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
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
        DELETE FROM aset WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/akun', (req, res) => {

    let view = `
        SELECT akun.*

        FROM e_aset.kode_akun akun 

        ORDER BY akun.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/kelompok', (req, res) => {

    let view = `
        SELECT kelompok.*

        FROM e_aset.kode_kelompok kelompok 

        WHERE kelompok.akunId = '`+req.body.akunId+`'

        ORDER BY kelompok.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/jenis', (req, res) => {

    let view = `
        SELECT jenis.*

        FROM e_aset.kode_jenis jenis 

        WHERE jenis.kelompokId = '`+req.body.kelompokId+`'

        ORDER BY jenis.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/objek', (req, res) => {

    let view = `
        SELECT objek.*

        FROM e_aset.kode_objek objek 

        WHERE objek.jenisId = '`+req.body.jenisId+`'

        ORDER BY objek.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/rincian', (req, res) => {

    let view = `
        SELECT rincian.*

        FROM e_aset.kode_rincian rincian 

        WHERE rincian.objekId = '`+req.body.objekId+`'

        ORDER BY rincian.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/sub', (req, res) => {

    let view = `
        SELECT sub.*

        FROM e_aset.kode_sub sub 

        WHERE sub.rincianId = '`+req.body.rincianId+`'

        ORDER BY sub.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

router.post('/subSub', (req, res) => {

    let view = `
        SELECT sub_sub.*

        FROM e_aset.kode_sub_sub sub_sub 

        WHERE sub_sub.subId = '`+req.body.subId+`'

        ORDER BY sub_sub.kode ASC
    `
     // ========================
        db.query(view, (err, result)=>{
            if (err) {res.json(err)}
            else{
                res.json({
                    data : result
                })
            }  
        })
        // ========================
});

module.exports = router;