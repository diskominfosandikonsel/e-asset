const express = require('express');
var db = require('../../../db/MySql/umum');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;    

    var tahun = req.body.tahun;

    var filterTahun = ''

    if (!tahun) {
        filterTahun = ``
    } else {
        filterTahun = ` AND YEAR(pengadaan.tgl_spk) = '` + tahun + `'`
    }


    let jml_data = `
        SELECT pengadaan.*

        FROM e_aset.pengadaan pengadaan

        WHERE pengadaan.unitId = '`+req.user.profile.unit_kerja+`'
        AND pengadaan.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 

        ORDER BY pengadaan.createAt DESC
    `

    let view = `
        SELECT pengadaan.*

        FROM e_aset.pengadaan pengadaan

        WHERE pengadaan.unitId = '`+req.user.profile.unit_kerja+`'
        AND pengadaan.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 

        ORDER BY pengadaan.createAt DESC

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

router.post('/admin', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;    

    var tahun = req.body.tahun;

    var filterTahun = ''

    if (!tahun) {
        filterTahun = ``
    } else {
        filterTahun = ` AND YEAR(pengadaan.tgl_spk) = '` + tahun + `'`
    }

    var unit = req.body.unit;

    var filterUnit = ''

    if (!unit) {
        filterUnit = ``
    } else {
        filterUnit = ` AND pengadaan.unitId = '`+unit+`'`
    }


    let jml_data = `
        SELECT pengadaan.*

        FROM e_aset.pengadaan pengadaan

        WHERE pengadaan.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+` 

        ORDER BY pengadaan.createAt DESC
    `

    let view = `
        SELECT pengadaan.*

        FROM e_aset.pengadaan pengadaan

        WHERE pengadaan.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+`

        ORDER BY pengadaan.createAt DESC

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

router.post('/addData',(req,res)=>{
    console.log(req.body);
    var data = req.body
    console.log(data);
    
    var insert = '';

    insert = `INSERT INTO pengadaan (id, no_spk, tgl_spk, keterangan, jangka_waktu, nilai, jenis, nama, npwp, bentuk, bank, alamat, alias, pimpinan, rekening, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.no_spk+`' ,'`+data.tgl_spk+`' ,'`+data.keterangan+`' ,'`+data.jangka_waktu+`' ,'`+data.nilai+`' ,'`+data.jenis+`' ,'`+data.nama+`' ,'`+data.npwp+`' ,'`+data.bentuk+`' ,'`+data.bank+`' ,'`+data.alamat+`' ,'`+data.alias+`' ,'`+data.pimpinan+`' ,'`+data.rekening+`','`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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
        UPDATE pengadaan SET
        no_spk = '`+data.no_spk+`',
        tgl_spk = '`+data.tgl_spk+`',
        keterangan = '`+data.keterangan+`',
        jangka_waktu = '`+data.jangka_waktu+`',
        nilai = '`+data.nilai+`',
        jenis = '`+data.jenis+`',
        nama = '`+data.nama+`',
        npwp = '`+data.npwp+`',
        bentuk = '`+data.bentuk+`',
        bank = '`+data.bank+`',
        alamat = '`+data.alamat+`',
        alias = '`+data.alias+`',
        pimpinan = '`+data.pimpinan+`',
        rekening = '`+data.rekening+`',
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
        DELETE FROM pengadaan WHERE id = '`+req.body.id+`'; 
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