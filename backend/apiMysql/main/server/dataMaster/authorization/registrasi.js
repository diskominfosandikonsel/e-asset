const express = require('express');
var db = require('../../../../../db/MySql/umum');
var dbx = require('../../../../../db/MySql/egov');

const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var unit_kerja = ``

    if (req.body.unit_kerja == '' || req.body.unit_kerja == undefined || req.body.unit_kerja == null) {
        unit_kerja = ``
    } else {
        unit_kerja = `biodata.unit_kerja = '`+req.body.unit_kerja+`' AND`
    }

    let jml_data = ` 
        SELECT
        users.id

        FROM egov.users users
        
        LEFT JOIN e_aset.menu_klp menu_klp
        ON menu_klp.id = users.Aset

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE 
        `+unit_kerja+`
        biodata.nama LIKE '%`+cari+`%' 
    `;

    let view = `
        SELECT
        users.id,
        users.username,
        users.hp,
        users.email,
        users.Aset as menu_klpx,
        menu_klp.uraian as menu_klp_uraian,
        biodata.nama,
        biodata.nip,
        biodata.gelar_depan,
        biodata.gelar_belakang,
        biodata.unit_kerja,
        biodata.metode_absen

        FROM egov.users users
        
        LEFT JOIN e_aset.menu_klp menu_klp
        ON menu_klp.id = users.Aset

        LEFT JOIN simpeg.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE 
        `+unit_kerja+`
        biodata.nama LIKE '%`+cari+`%' 

        LIMIT `+ data_star + `,` + data_batas + `
    `;

    var akses_menu = req.menu_akses
    const levelAkses = akses_menu.find(({ route }) => route === '/registrasi');

    if (levelAkses.readx == 1) {
        db.query(jml_data, (err, row) => {
            if (err) {
                console.log(err);
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
                            jml_data: halaman,
                            total: row.length,
                        })
                    }
                })
                // ========================
            }
        })
    } else {
        res.json("ANDA TIDAK MEMILIKI HAK AKSES..!!")
    }
});

router.post('/editData', (req, res) => {

    var query = `
        UPDATE users SET

        `+process.env.MAIN_DB_MYSQL+` = '`+req.body.menu_klp+`',
        username = '`+req.body.username+`',
        email = '`+req.body.email+`',
        hp = '`+req.body.hp+`',
        unit_kerja = '`+req.body.unit_kerja+`'


        WHERE id = '`+req.body.id+`'
    `

    var akses_menu = req.menu_akses
    const levelAkses = akses_menu.find(({ route }) => route === '/registrasi');

    if (levelAkses.updatex == 1) {
        dbx.query(query, (err, row)=>{
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                var query1 = `
                    UPDATE simpeg.biodata biodata SET
                    biodata.metode_absen = '`+req.body.metode_absen+`'
                    WHERE nip = '`+req.body.nip+`'
                `
                dbx.query(query1, (err1, row1)=>{
                    if (err1) {
                        console.log(err1);
                        res.send(err1);
                    } else {
                        console.log('Sukses mengubah data');
                        res.send(row1);
                    }
                })
    
            }
        })

    } else {
        res.json("ANDA TIDAK MEMILIKI HAK AKSES..!!")
    }


})

module.exports = router;