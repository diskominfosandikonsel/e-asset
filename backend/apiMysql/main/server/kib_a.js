const express = require('express');
var db = require('../../../db/MySql/umum');
const fs = require('fs');
var upload = require('../../../db/multer/pdf');

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
        filterTahun = ` AND YEAR(kib_a.tgl_beli) = '` + tahun + `'`
    }


    let jml_data = `
        SELECT 
        kib_a.*, hak.uraian as hak_tanah, asal.uraian as asal_usul

        FROM e_aset.kib_a kib_a 

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_a.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_a.id_asal

        WHERE 
        kib_a.unitId = '`+req.user.profile.unit_kerja+`' AND
        kib_a.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 
        ORDER BY kib_a.createAt DESC
    `

    let view = `
        SELECT 
        kib_a.*, hak.uraian as hak_tanah, asal.uraian as asal_usul

        FROM e_aset.kib_a kib_a 

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_a.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_a.id_asal

        WHERE 
        kib_a.unitId = '`+req.user.profile.unit_kerja+`' AND
        kib_a.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 
        ORDER BY kib_a.createAt DESC
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
        filterTahun = ` AND YEAR(kib_a.tgl_beli) = '` + tahun + `'`
    }

    var unit = req.body.unit;

    var filterUnit = ''

    if (!unit) {
        filterUnit = ``
    } else {
        filterUnit = ` AND kib_a.unitId = '`+unit+`'`
    }


    let jml_data = `
        SELECT 
        kib_a.*, hak.uraian as hak_tanah, asal.uraian as asal_usul

        FROM e_aset.kib_a kib_a 

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_a.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_a.id_asal

        WHERE 
        kib_a.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+` 
        ORDER BY kib_a.createAt DESC
    `

    let view = `
        SELECT 
        kib_a.*, hak.uraian as hak_tanah, asal.uraian as asal_usul

        FROM e_aset.kib_a kib_a 

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_a.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_a.id_asal

        WHERE 
        kib_a.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+`
        ORDER BY kib_a.createAt DESC
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

    insert = `INSERT INTO kib_a (id, kodep, kodea, tgl_beli, tgl_buku, luas, alamat, id_hak, no_sert, tgl_sert, id_asal, guna, harga, keterangan, file, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.kodep+`' ,'`+data.kodea+`' ,'`+data.tgl_beli+`' ,'`+data.tgl_buku+`' ,'`+data.luas+`' ,'`+data.alamat+`' ,'`+data.id_hak+`' ,'`+data.no_sert+`' ,'`+data.tgl_sert+`' ,'`+data.id_asal+`' ,'`+data.guna+`' ,'`+data.harga+`' ,'`+data.keterangan+`' ,'`+req.file.filename+`','`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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
        UPDATE kib_a SET
        kodep = '`+data.kodep+`',
        kodea = '`+data.kodea+`',
        tgl_beli = '`+data.tgl_beli+`',
        tgl_buku = '`+data.tgl_buku+`',
        luas = '`+data.luas+`',
        alamat = '`+data.alamat+`',
        id_hak = '`+data.id_hak+`',
        no_sert = '`+data.no_sert+`',
        tgl_sert = '`+data.tgl_sert+`',
        id_asal = '`+data.id_asal+`',
        guna = '`+data.guna+`',
        harga = '`+data.harga+`',
        keterangan = '`+data.keterangan+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
    } else {
        query = `
        UPDATE kib_a SET
        kodep = '`+data.kodep+`',
        kodea = '`+data.kodea+`',
        tgl_beli = '`+data.tgl_beli+`',
        tgl_buku = '`+data.tgl_buku+`',
        luas = '`+data.luas+`',
        alamat = '`+data.alamat+`',
        id_hak = '`+data.id_hak+`',
        no_sert = '`+data.no_sert+`',
        tgl_sert = '`+data.tgl_sert+`',
        id_asal = '`+data.id_asal+`',
        guna = '`+data.guna+`',
        harga = '`+data.harga+`',
        keterangan = '`+data.keterangan+`',
        file = '`+req.file.filename+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
        hapus_file(data.file_old);
        console.log(data.file_old);
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
        DELETE FROM kib_a WHERE id = '`+req.body.id+`'; 
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