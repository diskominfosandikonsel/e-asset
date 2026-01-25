const express = require('express');
const app = express();
const cors = require('cors');
var path = require("path");
require('dotenv').config({ debug: false })

const middleware = require('./auth/middlewares');
const auth = require('./auth');

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use(middleware.checkTokenSeetUser);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello pengunjung,,, Anda mengunjugi alamat yg salah... mungkin maksud anda http://konaweselatankab.go.id ! 🌈✨🦄',
    user: req.user
  });
});

// API ENDPOINTS

app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

const dm_menuList = require('./apiMysql/main/server/dataMaster/authorization/menuList');
app.use('/api/v1/dm_menuList', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_menuList);

const dm_kelompokUsers = require('./apiMysql/main/server/dataMaster/authorization/kelompokUsers');
app.use('/api/v1/dm_kelompokUsers', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_kelompokUsers);

const dm_registrasi = require('./apiMysql/main/server/dataMaster/authorization/registrasi');
app.use('/api/v1/dm_registrasi', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_registrasi);

const checkAuth = require('./apiMysql/checkAuth');
app.use('/api/v1/checkAuth', middleware.isLoggedIn, checkAuth);

const master_asal = require('./apiMysql/main/server/dataMaster/masterAsal');
app.use('/api/v1/master_asal', middleware.isLoggedIn, middleware.sideMenuMidleware, master_asal);

const master_hak = require('./apiMysql/main/server/dataMaster/masterHak');
app.use('/api/v1/master_hak', middleware.isLoggedIn, middleware.sideMenuMidleware, master_hak);

const master_kondisi = require('./apiMysql/main/server/dataMaster/masterKondisi');
app.use('/api/v1/master_kondisi', middleware.isLoggedIn, middleware.sideMenuMidleware, master_kondisi);

const kib_a = require('./apiMysql/main/server/kibA');
app.use('/api/v1/kib_a', middleware.isLoggedIn, middleware.sideMenuMidleware, kib_a);

// API ENDPOINTS

// ERROR HANDLER

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

// ERROR HANDLER

const port = process.env.PORT || 5028;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
  console.error('Server failed:', err);
});
