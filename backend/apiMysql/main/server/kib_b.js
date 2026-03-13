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
        filterTahun = ` AND YEAR(kib_b.tgl_beli) = '` + tahun + `'`
    }


    let jml_data = `
        SELECT 
        kib_b.*, hak.uraian as hak_tanah, asal.uraian as asal_usul,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.kib_b kib_b 

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = kib_b.subSubId

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_b.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_b.id_asal

        WHERE 
        kib_b.unitId = '`+req.user.profile.unit_kerja+`' AND
        kib_b.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 
        ORDER BY kib_b.createAt DESC
    `

    let view = `
        SELECT 
        kib_b.*, hak.uraian as hak_tanah, asal.uraian as asal_usul,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.kib_b kib_b 

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = kib_b.subSubId

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_b.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_b.id_asal

        WHERE 
        kib_b.unitId = '`+req.user.profile.unit_kerja+`' AND
        kib_b.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` 
        ORDER BY kib_b.createAt DESC
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
        filterTahun = ` AND YEAR(kib_b.tgl_beli) = '` + tahun + `'`
    }

    var unit = req.body.unit;

    var filterUnit = ''

    if (!unit) {
        filterUnit = ``
    } else {
        filterUnit = ` AND kib_b.unitId = '`+unit+`'`
    }


    let jml_data = `
        SELECT 
        kib_b.*, hak.uraian as hak_tanah, asal.uraian as asal_usul,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.kib_b kib_b 

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = kib_b.subSubId

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_b.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_b.id_asal

        WHERE 
        kib_b.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+` 
        ORDER BY kib_b.createAt DESC
    `

    let view = `
        SELECT 
        kib_b.*, hak.uraian as hak_tanah, asal.uraian as asal_usul,
        sub_sub.kode AS kode_sub_sub, sub_sub.uraian AS uraian_sub_sub

        FROM e_aset.kib_b kib_b 

        LEFT JOIN e_aset.kode_sub_sub sub_sub
        ON sub_sub.id = kib_b.subSubId

        LEFT JOIN e_aset.master_hak hak
        ON hak.id = kib_b.id_hak

        LEFT JOIN e_aset.master_asal asal
        ON asal.id = kib_b.id_asal

        WHERE 
        kib_b.keterangan LIKE '%`+cari+`%'
        `+filterTahun+` `+filterUnit+`
        ORDER BY kib_b.createAt DESC
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

    insert = `INSERT INTO kib_b (id, kodep, subSubId, no_reg, ruang, tgl_beli, tgl_buku, merk, type, no_pabrik, bahan, no_rangka, no_mesin, no_bpkb, no_polisi, id_asal, id_kondisi, harga, manfaat, nilai, keterangan, file, unitId, userId, createAt) 
        VALUES ('`+uniqid()+`' ,'`+data.kodep+`' ,'`+data.subSubId+`' ,'`+data.no_reg+`' ,'`+data.ruang+`' ,'`+data.tgl_beli+`' ,'`+data.tgl_buku+`' ,'`+data.merk+`' ,'`+data.type+`' ,'`+data.no_pabrik+`' ,'`+data.bahan+`' ,'`+data.no_rangka+`' ,'`+data.no_mesin+`' ,'`+data.no_bpkb+`' ,'`+data.no_polisi+`' ,'`+data.id_asal+`' ,'`+data.kondisi+`' ,'`+data.harga+`' ,'`+data.manfaat+`' ,'`+data.nilai+`' , '`+data.keterangan+`' ,'`+req.file.filename+`','`+req.user.profile.unit_kerja+`' ,'`+req.user._id+`' , NOW() )
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
        UPDATE kib_b SET
        kodep = '`+data.kodep+`',
        subSubId = '`+data.subSubId+`',
        no_reg = '`+data.no_reg+`',
        ruang = '`+data.ruang+`',
        tgl_beli = '`+data.tgl_beli+`',
        tgl_buku = '`+data.tgl_buku+`',
        merk = '`+data.merk+`',
        type = '`+data.type+`',
        no_pabrik = '`+data.no_pabrik+`',
        bahan = '`+data.bahan+`',
        no_rangka = '`+data.no_rangka+`',
        no_mesin = '`+data.no_mesin+`',
        no_bpkb = '`+data.no_bpkb+`',
        no_polisi = '`+data.no_polisi+`',
        id_asal = '`+data.id_asal+`',
        id_kondisi = '`+data.id_kondisi+`',
        harga = '`+data.harga+`',
        manfaat = '`+data.manfaat+`',
        nilai = '`+data.nilai+`',
        keterangan = '`+data.keterangan+`',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
    } else {
        query = `
        UPDATE kib_b SET
        kodep = '`+data.kodep+`',
        subSubId = '`+data.subSubId+`',
        no_reg = '`+data.no_reg+`',
        ruang = '`+data.ruang+`',
        tgl_beli = '`+data.tgl_beli+`',
        tgl_buku = '`+data.tgl_buku+`',
        merk = '`+data.merk+`',
        type = '`+data.type+`',
        no_pabrik = '`+data.no_pabrik+`',
        bahan = '`+data.bahan+`',
        no_rangka = '`+data.no_rangka+`',
        no_mesin = '`+data.no_mesin+`',
        no_bpkb = '`+data.no_bpkb+`',
        no_polisi = '`+data.no_polisi+`',
        id_asal = '`+data.id_asal+`',
        id_kondisi = '`+data.id_kondisi+`',
        harga = '`+data.harga+`',
        manfaat = '`+data.manfaat+`',
        nilai = '`+data.nilai+`',
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
        DELETE FROM kib_b WHERE id = '`+req.body.id+`'; 
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