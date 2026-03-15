const express = require('express');
var db = require('../../../db/MySql/umum');
const fs = require('fs');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var tahun = req.body.tahun;

    var filterTahun = ''

    if (!tahun) {
        filterTahun = ``
    } else {
        filterTahun = ` AND YEAR(penggunaan.tgl) = '` + tahun + `'`
    }


    let jml_data = `
        SELECT penggunaan.*,
        a.kodep as kode_a, b.kodep as kode_b, b.merk as merk_b, b.type as type_b,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.penggunaan penggunaan

        LEFT JOIN e_aset.kib_a a
        ON a.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_b b
        ON b.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_c c
        ON c.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_d d
        ON d.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_e e
        ON e.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_f f
        ON f.id = penggunaan.asetId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = penggunaan.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE penggunaan.unitId = '`+ req.user.profile.unit_kerja + `'
        AND biodata.nama LIKE '%`+ cari + `%'
        `+ filterTahun + ` 

        ORDER BY penggunaan.createAt DESC
    `

    let view = `
        SELECT penggunaan.*,
        a.kodep as kode_a, b.kodep as kode_b, b.merk as merk_b, b.type as type_b,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.penggunaan penggunaan

        LEFT JOIN e_aset.kib_a a
        ON a.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_b b
        ON b.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_c c
        ON c.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_d d
        ON d.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_e e
        ON e.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_f f
        ON f.id = penggunaan.asetId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = penggunaan.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE penggunaan.unitId = '`+ req.user.profile.unit_kerja + `'
        AND biodata.nama LIKE '%`+ cari + `%'
        `+ filterTahun + ` 

        ORDER BY penggunaan.createAt DESC

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

router.post('/pengguna', (req, res) => {

    let view = `
        SELECT
        biodata.nama,
        biodata.gelar_depan,
        biodata.gelar_belakang,
        biodata.nip,
        biodata.NIK,
        biodata.alamat,
        status.uraian,
        jabatan.uraian

        FROM simpeg.biodata biodata

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE biodata.unit_kerja = '`+ req.user.profile.unit_kerja + `'

        ORDER BY biodata.nama ASC
    `
            // ========================
            db.query(view, (err, result) => {
                if (err) { res.json(err) }
                else {
                    res.json({
                        data: result
                    })
                }
            })
            // ========================
});

router.post('/admin', (req, res) => {
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var tahun = req.body.tahun;

    var filterTahun = ''

    if (!tahun) {
        filterTahun = ``
    } else {
        filterTahun = ` AND YEAR(penggunaan.tgl) = '` + tahun + `'`
    }

    var unit = req.body.unit;

    var filterUnit = ''

    if (!unit) {
        filterUnit = ``
    } else {
        filterUnit = ` AND penggunaan.unitId = '` + unit + `'`
    }


    let jml_data = `
        SELECT penggunaan.*,
        a.kodep as kode_a, b.kodep as kode_b, b.merk as merk_b, b.type as type_b,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.penggunaan penggunaan

        LEFT JOIN e_aset.kib_a a
        ON a.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_b b
        ON b.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_c c
        ON c.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_d d
        ON d.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_e e
        ON e.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_f f
        ON f.id = penggunaan.asetId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = penggunaan.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE biodata.nama LIKE '%`+ cari + `%'
        `+ filterTahun + ` ` + filterUnit + ` 

        ORDER BY penggunaan.createAt DESC
    `

    let view = `
        SELECT penggunaan.*,
        a.kodep as kode_a, b.kodep as kode_b, b.merk as merk_b, b.type as type_b,
        biodata.nama as nama, biodata.gelar_depan as g_depan, biodata.gelar_belakang as g_belakang, biodata.alamat as alamat, biodata.NIK as nik, biodata.nip as nip
        jabatan.uraian as jabatan, status.uraian as status

        FROM e_aset.penggunaan penggunaan

        LEFT JOIN e_aset.kib_a a
        ON a.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_b b
        ON b.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_c c
        ON c.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_d d
        ON d.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_e e
        ON e.id = penggunaan.asetId

        LEFT JOIN e_aset.kib_f f
        ON f.id = penggunaan.asetId

        LEFT JOIN simpeg.biodata biodata
        ON biodata.id = penggunaan.penggunaId

        LEFT JOIN simpeg.jns_pegawai status
        ON status.id = biodata.jns_pegawai_id

        LEFT JOIN simpeg.jabatan jabatan
        ON jabatan.id = biodata.jabatan

        WHERE biodata.nama LIKE '%`+ cari + `%'
        `+ filterTahun + ` ` + filterUnit + `

        ORDER BY penggunaan.createAt DESC

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

router.post('/addData', upload.single("file"), (req,res)=>{
    console.log(req.body);
    var data = JSON.parse(req.body.data)

    var insert = '';

    insert = `INSERT INTO penggunaan (id, asetId, nomor, tgl, file, penggunaId, keterangan, unitId, userId, createAt) 
        VALUES ('`+ uniqid() + `' ,'` + data.asetId + `' ,'` + data.nomor + `' ,'` + data.tgl + `' ,'`+req.file.filename+`' ,'` + data.penggunaId + `', '` + data.keterangan + `','` + req.user.profile.unit_kerja + `' ,'` + req.user._id + `' , NOW() )
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

router.post('/editData', upload.single("file"), (req,res)=>{
    console.log(req.body);
    var data = JSON.parse(req.body.data)
    var query = '';
    if (!req.file) {
    query = `
        UPDATE penggunaan SET
        asetId = '`+ data.asetId + `',
        nomor = '`+ data.nomor + `',
        tgl = '`+ data.tgl + `',
        penggunaId = '`+ data.penggunaId + `',
        keterangan = '`+ data.keterangan + `',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
        `;
    } else {
        query = `
        UPDATE penggunaan SET
        asetId = '`+ data.asetId + `',
        nomor = '`+ data.nomor + `',
        tgl = '`+ data.tgl + `',
        file = '`+req.file.filename+`',
        penggunaId = '`+ data.penggunaId + `',
        keterangan = '`+ data.keterangan + `',
        unitId = '`+req.user.profile.unit_kerja+`',
        userId = '`+req.user._id+`',
        editedAt = NOW()
        WHERE id = '`+data.id+`'
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
        DELETE FROM penggunaan WHERE id = '`+req.body.id+`'; 
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