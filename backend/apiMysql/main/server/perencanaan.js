const express = require('express');
var db = require('../../../db/MySql/umum');
const fs = require('fs');
var upload = require('../../../db/multer/pdf');

const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1) * data_batas;
    var halaman = 1;


    let jml_data = `
        SELECT perencanaan.*,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.perencanaan perencanaan

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = perencanaan.subSubId
        
        ORDER BY perencanaan.createAt DESC
    `

    let view = `
        SELECT perencanaan.*,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.perencanaan perencanaan

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = perencanaan.subSubId
        
        ORDER BY perencanaan.createAt DESC
        
        LIMIT `+ data_star + `,` + data_batas + `
    `
    db.query(jml_data, (err, row) => {
        if (err) {
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            // ========================
            db.query(view, (err, result) => {
                if (err) { res.json(err) }
                else {
                    halaman = Math.ceil(row.length / data_batas);
                    if (halaman < 1) { halaman = 1 }
                    res.json({
                        data: result,
                        jml_data: halaman
                    })
                }
            })
            // ========================

        }
    })
});

router.post('/addData', upload.single("file"), (req, res) => {
    console.log(req.body);
    var data = JSON.parse(req.body.data)
    var insert = '';

    insert = `INSERT INTO perencanaan (subSubId, merk, type, ukuran, jumlah, harga, rekening, keterangan, file, unitId, userId, createAt) 
        VALUES ('`+ data.subSubId + `' ,'` + data.merk + `' ,'` + data.type + `' ,'` + data.ukuran + `'  ,'` + data.jumlah + `' ,'` + data.harga + `' ,'` + data.rekening + `' ,'` + data.keterangan + `' , '` + req.file.filename + `','` + req.user.profile.unit_kerja + `' ,'` + req.user._id + `' , NOW() )
        `;

    db.query(insert, (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
});

router.post('/editData', upload.single("file"), (req, res) => {
    console.log(req.body);
    var data = JSON.parse(req.body.data)
    var query = '';
    if (!req.file) {
        query = `
        UPDATE perencanaan SET
        subSubId = '`+ data.subSubId + `',
        merk = '`+ data.merk + `',
        type = '`+ data.type + `',
        ukuran = '`+ data.ukuran + `',
        jumlah = '`+ data.jumlah + `',
        harga = '`+ data.harga + `',
        rekening = '`+ data.rekening + `',
        keterangan = '`+ data.keterangan + `',
        unitId = '`+ req.user.profile.unit_kerja + `',
        userId = '`+ req.user._id + `',
        editedAt = NOW()
        WHERE id = '`+ data.id + `'
        `;
    } else {
        query = `
        UPDATE perencanaan SET
        subSubId = '`+ data.subSubId + `',
        merk = '`+ data.merk + `',
        type = '`+ data.type + `',
        ukuran = '`+ data.ukuran + `',
        jumlah = '`+ data.jumlah + `',
        harga = '`+ data.harga + `',
        rekening = '`+ data.rekening + `',
        keterangan = '`+ data.keterangan + `',
        file = '`+ req.file.filename + `',
        unitId = '`+ req.user.profile.unit_kerja + `',
        userId = '`+ req.user._id + `',
        editedAt = NOW()
        WHERE id = '`+ data.id + `'
        `;
        hapus_file(data.file_old);
    }
    db.query(query, (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })
})

router.post('/removeData', (req, res)=> {
    var file = req.body.file
    hapus_file(file);
    var query = `
        DELETE FROM perencanaan WHERE id = '`+req.body.id+`'; 
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