const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var dbs = require('../db/MySql/umum');

const router = express.Router();

const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required(),
    password: Joi.string().min(6).required(),
});

function respondError422(res, text){
  return res.status(422).json({
    success: false,
    message: text
  });
}

router.post('/login', (req, res, next) =>{
    console.log("ADA YG LOGIN")
    console.log("INI DATANYA")
    console.log(req.body);

    const result = schema.validate(req.body);
    if (!result.error) {

        let view = ` 
        SELECT 
            egov.users.*, 
            simpeg.unit_kerja.unit_kerja as unit_kerja_nama,
            simpeg.unit_kerja.alamat as unit_kerja_alamat,

            simpeg.biodata.id as bio_id,
            simpeg.biodata.nama as bio_nama,
            simpeg.biodata.gelar_depan as bio_gelar_depan,
            simpeg.biodata.gelar_belakang as bio_gelar_belakang,
            simpeg.biodata.tempat_lahir  as bio_tempat_lahir ,
            simpeg.biodata.ttl as bio_ttl,
            simpeg.biodata.gol as bio_gol,
            simpeg.biodata.jabatan as bio_jabatan ,
            simpeg.biodata.alamat as bio_alamat,
            simpeg.instansi.id as instansi_id,
            simpeg.instansi.instansi as instansi_nama

        FROM egov.users 

        JOIN simpeg.unit_kerja 
            ON egov.users.unit_kerja = simpeg.unit_kerja.id
        JOIN simpeg.instansi 
            ON simpeg.instansi.id = simpeg.unit_kerja.instansi
        JOIN simpeg.biodata 
            ON egov.users.nama_nip = simpeg.biodata.nip
        WHERE users.username = '`+req.body.username+`';
        `;

        dbs.query(view, (err, row)=>{

            if(row.length <= 0) {
                
                return respondError422(res, "Username Salah");

            }else{

                var user = {}
                for (var i in row) {user = row[i]}

                const payload =  {
                    _id: user.id,
                    username : user.username,
                    profile : {
                        nama : user.bio_gelar_depan+','+user.bio_nama+','+user.bio_gelar_belakang,
                        NIP : user.nama_nip,
                        ttl : user.bio_tempat_lahir+'/'+user.bio_ttl,
                        gol : user.bio_gol,
                        instansi_id : user.instansi_id,
                        ref_instansi : user.instansi_nama,
                        unit_kerja : user.unit_kerja,
                        unit_kerja_nama : user.unit_kerja_nama,
                        unit_kerja_alamat : user.unit_kerja_alamat,
                        jabatan : user.bio_jabatan,
                        alamat : user.bio_alamat,
                        user_id : user.bio_id,

                        Office : user.Office,
                        Planing : user.Planing,
                        Aset : user.Aset,
                        Monev : user.Monev,
                        Berita : user.Berita,
                        Pengaduan : user.Pengaduan,
                        Sakip : user.Sakip,
                        Bhumie : user.Bhumie,
                        CCTV : user.CCTV,
                        Simpeg : user.Simpeg,
                        Linja : user.Linja,
                        Registrasi : user.Registrasi,
                        absensi : user.absensi

                    }
                };

                bcrypt.compare(req.body.password, user.password).then((result) => {
                    // Jika client mengirimkan password yang benar
                    if(result){
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '24h'
                        }, (err, token) => {
                            if(err){
                                return respondError422(res, "Kesalahan dlm pembuatan token");
                            }else{
                                res.json({token : token, profile : payload});
                            }
                        })
                    }else{
                        return respondError422(res, "Password salah");
                    }
                });
            }
        })

    }else{
        return respondError422(res, "Gagal Login Periksa kembali username atau password anda..!");
    }
});

module.exports = router;