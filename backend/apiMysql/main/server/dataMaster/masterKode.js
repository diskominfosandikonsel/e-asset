const express = require("express");
var db = require("../../../../db/MySql/umum");

var uniqid = require("uniqid");
const router = express.Router();

router.post("/akun", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    akun.*

    FROM e_aset.kode_akun akun 
    
    WHERE 

    akun.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT 
    akun.*

    FROM e_aset.kode_akun akun 
    
    WHERE 

    akun.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY akun.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addAkun", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_akun (id, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `', '` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editAkun", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_akun SET
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeAkun", (req, res) => {
  var query =
    `
    DELETE FROM kode_akun WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/kelompok", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    kelompok.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun

    FROM e_aset.kode_kelompok kelompok 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = kelompok.akunId
    
    WHERE 

    kelompok.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT 
    kelompok.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun

    FROM e_aset.kode_kelompok kelompok 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = kelompok.akunId
    
    WHERE 

    kelompok.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY kelompok.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addKelompok", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_kelompok (id, akunId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editKelompok", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_kelompok SET
    akunId = '` +
    req.body.akunId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeKelompok", (req, res) => {
  var query =
    `
    DELETE FROM kode_kelompok WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/jenis", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    jenis.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok

    FROM e_aset.kode_jenis jenis 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = jenis.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = jenis.kelompokId
    
    WHERE 

    jenis.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT 
    jenis.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok

    FROM e_aset.kode_jenis jenis 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = jenis.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = jenis.kelompokId
    
    WHERE 

    jenis.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY jenis.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addJenis", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_jenis (id, akunId, kelompokId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kelompokId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editJenis", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_jenis SET
    akunId = '` +
    req.body.akunId +
    `',
    kelompokId = '` +
    req.body.kelompokId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeJenis", (req, res) => {
  var query =
    `
    DELETE FROM kode_jenis WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/objek", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    objek.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis

    FROM e_aset.kode_objek objek 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = objek.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = objek.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = objek.jenisId
    
    WHERE 

    objek.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT
    objek.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis

    FROM e_aset.kode_objek objek 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = objek.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = objek.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = objek.jenisId
    
    WHERE 

    objek.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY objek.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addObjek", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_objek (id, akunId, kelompokId, jenisId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kelompokId +
    `' ,'` +
    req.body.jenisId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editObjek", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_objek SET
    akunId = '` +
    req.body.akunId +
    `',
    kelompokId = '` +
    req.body.kelompokId +
    `',
    jenisId = '` +
    req.body.jenisId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeObjek", (req, res) => {
  var query =
    `
    DELETE FROM kode_objek WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/rincian", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    rincian.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek

    FROM e_aset.kode_rincian rincian 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = rincian.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = rincian.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = rincian.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = rincian.objekId
    
    WHERE 

    rincian.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT
    rincian.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek

    FROM e_aset.kode_rincian rincian 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = rincian.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = rincian.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = rincian.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = rincian.objekId
    
    WHERE 

    rincian.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY rincian.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addRincian", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_rincian (id, akunId, kelompokId, jenisId, objekId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kelompokId +
    `' ,'` +
    req.body.jenisId +
    `' ,'` +
    req.body.objekId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editRincian", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_rincian SET
    akunId = '` +
    req.body.akunId +
    `',
    kelompokId = '` +
    req.body.kelompokId +
    `',
    jenisId = '` +
    req.body.jenisId +
    `',
    objekId = '` +
    req.body.objekId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeRincian", (req, res) => {
  var query =
    `
    DELETE FROM kode_rincian WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/sub", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian

    FROM e_aset.kode_sub sub

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub.rincianId
    
    WHERE 

    sub.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT
    sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian

    FROM e_aset.kode_sub sub 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub.rincianId
    
    WHERE 

    sub.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY sub.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addSub", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_sub (id, akunId, kelompokId, jenisId, objekId, rincianId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kelompokId +
    `' ,'` +
    req.body.jenisId +
    `' ,'` +
    req.body.objekId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editSub", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_sub SET
    akunId = '` +
    req.body.akunId +
    `',
    kelompokId = '` +
    req.body.kelompokId +
    `',
    jenisId = '` +
    req.body.jenisId +
    `',
    objekId = '` +
    req.body.objekId +
    `',
    rincianId = '` +
    req.body.rincianId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeSub", (req, res) => {
  var query =
    `
    DELETE FROM kode_sub WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/subSub", (req, res) => {
  var data_batas = 10;
  var data_star = (req.body.data_ke - 1) * data_batas;
  var cari = req.body.cari_value;
  var halaman = 1;

  let jml_data =
    `
    SELECT 
    sub_sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian,
    sub.kode AS kode_sub, sub.uraian AS uraian_sub

    FROM e_aset.kode_sub_sub sub_sub

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub_sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub_sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub_sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub_sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub_sub.rincianId

    LEFT JOIN e_aset.kode_sub sub
    ON sub.id = sub_sub.subId
    
    WHERE 

    sub_sub.uraian LIKE '%` +
    cari +
    `%'

`;

  let view =
    `
    SELECT
    sub_sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian,
    sub.kode AS kode_sub, sub.uraian AS uraian_sub

    FROM e_aset.kode_sub_sub sub_sub 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub_sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub_sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub_sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub_sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub_sub.rincianId

    LEFT JOIN e_aset.kode_sub sub
    ON sub.id = sub_sub.subId
    
    WHERE 

    sub_sub.uraian LIKE '%` +
    cari +
    `%'

    ORDER BY sub_sub.uraian ASC
    LIMIT ` +
    data_star +
    `,` +
    data_batas +
    `
`;
  db.query(jml_data, (err, row) => {
    if (err) {
      res.json(err);
    } else {
      halaman = Math.ceil(row.length / data_batas);
      if (halaman < 1) {
        halaman = 1;
      }
      // ========================
      db.query(view, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          halaman = Math.ceil(row.length / data_batas);
          if (halaman < 1) {
            halaman = 1;
          }
          res.json({
            data: result,
            jml_data: halaman,
          });
        }
      });
    }
  });
});

router.post("/addSubSub", (req, res) => {
  console.log(req.body);
  var insert = "";

  insert =
    `INSERT INTO kode_sub_sub (id, akunId, kelompokId, jenisId, objekId, rincianId, subId, kode, uraian, unitId, userId, createAt) 
    VALUES ('` +
    uniqid() +
    `' ,'` +
    req.body.akunId +
    `' ,'` +
    req.body.kelompokId +
    `' ,'` +
    req.body.jenisId +
    `' ,'` +
    req.body.objekId +
    `' ,'` +
    req.body.rincianId +
    `' ,'` +
    req.body.subId +
    `' ,'` +
    req.body.kode +
    `' ,'` +
    req.body.uraian +
    `' ,'` +
    req.user.profile.unit_kerja +
    `' ,'` +
    req.user._id +
    `' , NOW() )
    `;

  db.query(insert, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/editSubSub", (req, res) => {
  var query = "";

  query =
    `
    UPDATE kode_sub_sub SET
    akunId = '` +
    req.body.akunId +
    `',
    kelompokId = '` +
    req.body.kelompokId +
    `',
    jenisId = '` +
    req.body.jenisId +
    `',
    objekId = '` +
    req.body.objekId +
    `',
    rincianId = '` +
    req.body.rincianId +
    `',
    subId = '` +
    req.body.subId +
    `',
    kode = '` +
    req.body.kode +
    `',
    uraian = '` +
    req.body.uraian +
    `',
    unitId = '` +
    req.user.profile.unit_kerja +
    `',
    userId = '` +
    req.user._id +
    `',
    editedAt = NOW()
    WHERE id = '` +
    req.body.id +
    `'
    `;

  db.query(query, (err, row) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.post("/removeSubSub", (req, res) => {
  var query =
    `
    DELETE FROM kode_sub_sub WHERE id = '` +
    req.body.id +
    `'; 
`;
  db.query(query, (err, row) => {
    if (err) {
      res.send(err);
    } else {
      res.send(row);
    }
  });
});

router.get("/akun", (req, res) => {
  let view = `
    SELECT akun.*

    FROM e_aset.kode_akun akun 


    ORDER BY akun.uraian ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/kelompok", (req, res) => {
  let view = `
    SELECT kelompok.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun

    FROM e_aset.kode_kelompok kelompok 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = kelompok.akunId

    ORDER BY kelompok.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/jenis", (req, res) => {
  let view = `
    SELECT jenis.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok

    FROM e_aset.kode_jenis jenis 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = jenis.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = jenis.kelompokId

    ORDER BY jenis.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/objek", (req, res) => {
  let view = `
    SELECT objek.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis

    FROM e_aset.kode_objek objek 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = objek.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = objek.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = objek.jenisId


    ORDER BY objek.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/rincian", (req, res) => {
  let view = `
    SELECT rincian.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek

    FROM e_aset.kode_rincian rincian 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = rincian.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = rincian.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = rincian.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = rincian.objekId
    ORDER BY rincian.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/sub", (req, res) => {
  let view = `
    sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian

    FROM e_aset.kode_sub sub 

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub.rincianId


    ORDER BY sub.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

router.get("/subSub", (req, res) => {
  let view = `
    SELECT 
    sub_sub.*,
    akun.kode AS kode_akun, akun.uraian AS uraian_akun,
    kelompok.kode AS kode_kelompok, kelompok.uraian AS uraian_kelompok,
    jenis.kode AS kode_jenis, jenis.uraian AS uraian_jenis,
    objek.kode AS kode_objek, objek.uraian AS uraian_objek,
    rincian.kode AS kode_rincian, rincian.uraian AS uraian_rincian,
    sub.kode AS kode_sub, sub.uraian AS uraian_sub

    FROM e_aset.kode_sub_sub sub_sub

    LEFT JOIN e_aset.kode_akun akun
    ON akun.id = sub_sub.akunId

    LEFT JOIN e_aset.kode_kelompok kelompok
    ON kelompok.id = sub_sub.kelompokId

    LEFT JOIN e_aset.kode_jenis jenis
    ON jenis.id = sub_sub.jenisId

    LEFT JOIN e_aset.kode_objek objek
    ON objek.id = sub_sub.objekId

    LEFT JOIN e_aset.kode_rincian rincian
    ON rincian.id = sub_sub.rincianId

    LEFT JOIN e_aset.kode_sub sub
    ON sub.id = sub_sub.subId


    ORDER BY sub_sub.akunId ASC
`;
  db.query(view, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

module.exports = router;
