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
        SELECT reklasifikasi.*,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip,
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.reklasifikasi reklasifikasi

        LEFT JOIN e_aset.penggunaan penggunaan
        ON penggunaan.id = reklasifikasi.penggunaanId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = reklasifikasi.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE reklasifikasi.penggunaanId = '`+req.body.penggunaanId+`'

        ORDER BY reklasifikasi.createAt DESC
    `

    let view = `
        SELECT reklasifikasi.*,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip,
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.reklasifikasi reklasifikasi

        LEFT JOIN e_aset.penggunaan penggunaan
        ON penggunaan.id = reklasifikasi.penggunaanId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = reklasifikasi.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE reklasifikasi.penggunaanId = '`+req.body.penggunaanId+`'

        ORDER BY reklasifikasi.createAt DESC

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

    insert = `INSERT INTO reklasifikasi (id, pengunaanId, nomor, tgl, file, penerimaId, transaksi, keterangan, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.penggunaanId+`' ,'`+data.nomor+`' ,'`+data.tgl+`' , '`+req.file.filename+`', '`+data.penerimaId+`', '`+data.transaksi+`', '`+data.keterangan+`' ,'`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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
        UPDATE reklasifikasi SET
        penggunaanId = '`+data.penggunaanId+`',
        nomor = '`+data.nomor+`',
        tgl = '`+data.tgl+`',
        penerimaId = '`+data.penerimaId+`',
        transaksi = '`+data.transaksi+`',
        keterangan = '`+data.keterangan+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
    } else {
        query = `
        UPDATE reklasifikasi SET
        penggunaanId = '`+data.penggunaanId+`',
        nomor = '`+data.nomor+`',
        tgl = '`+data.tgl+`',
        file = '`+req.file.filename+`',
        penerimaId = '`+data.penerimaId+`',
        transaksi = '`+data.transaksi+`',
        keterangan = '`+data.keterangan+`',
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
        DELETE FROM reklasifikasi WHERE id = '`+req.body.id+`'; 
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