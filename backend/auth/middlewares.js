// Membuat verifikasi token yang dikirimkan melalui headers client

const jwt = require('jsonwebtoken');
var db_absensi = require('../db/MySql/umum');

function checkTokenSeetUser(req, res, next){
     const authHeader = req.get('authorization');
     if (authHeader) {
          // jika ada authorization yang dikirim client melalui headers
          // dan karena token yang dikirim dipisahkan spasi maka kita pisahkan bagiannya
          const token = authHeader.split(' ')[1];
          if (token) {
               // jika tokennya ada
               // maka lakukan verifikasi terhadap token tersebut
               jwt.verify(token, process.env.TOKEN_SECRET, function(error, user) {
                    if (error) {
                         console.log(error);
                    }

                    // Jika tidak ada error selanjutnya token di dapatkan
                    // akan di terjemakan ke identitas user clien
                    req.user = user;
                    next()
               });
          }else{
               next();
          }

     }else{

          next();
     }
}

function isLoggedIn(req, res, next){
     if (req.user) {
          // jika login maka lanjutkan ke tahap berikutnya
          next();
     }else {
          // kalau tidak login berikan respon error
          const error = new Error('SSILAHKAN LOGIN DULU..!!!');
          res.status(401);
          next(error);
     }
}

function sideMenuMidleware(req, res, next){

     var profile = req.user.profile

          var query = `
               SELECT 
               menu_klp_list.*,
               menu.route
               FROM menu_klp_list
               JOIN menu
               ON menu_klp_list.menu_id = menu.id

               WHERE menu_klp_list.menu_klp_id = `+parseInt(profile.Aset)+`

          `;

          db_absensi.query(query, (err, rows) => {
               if (err) {
                    console.log(err);
               } else {
                    req.menu_akses = rows
                    next();

               }
          })
}

module.exports = {
     checkTokenSeetUser,
     isLoggedIn,
     sideMenuMidleware,
}