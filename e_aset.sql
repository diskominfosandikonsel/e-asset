-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 27, 2026 at 10:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_aset`
--

-- --------------------------------------------------------

--
-- Table structure for table `kib_a`
--

CREATE TABLE `kib_a` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `luas` double DEFAULT NULL,
  `alamat` text NOT NULL,
  `id_hak` varchar(35) NOT NULL,
  `no_sert` varchar(35) NOT NULL,
  `tgl_sert` date DEFAULT NULL,
  `id_asal` varchar(35) NOT NULL,
  `guna` text NOT NULL,
  `harga` double NOT NULL,
  `keterangan` text NOT NULL,
  `file` text NOT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kib_b`
--

CREATE TABLE `kib_b` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `ruang` varchar(225) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `merk` varchar(225) DEFAULT NULL,
  `type` varchar(225) DEFAULT NULL,
  `no_pabrik` varchar(225) DEFAULT NULL,
  `bahan` varchar(225) DEFAULT NULL,
  `no_rangka` varchar(225) DEFAULT NULL,
  `no_mesin` varchar(225) DEFAULT NULL,
  `no_bpkb` varchar(225) DEFAULT NULL,
  `no_polisi` varchar(225) DEFAULT NULL,
  `id_asal` varchar(35) DEFAULT NULL,
  `id_kondisi` varchar(35) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `masa` text DEFAULT NULL,
  `nilai` double DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kib_c`
--

CREATE TABLE `kib_c` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `luas` double DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `kondisi` varchar(10) DEFAULT NULL,
  `tingkat` varchar(10) DEFAULT NULL,
  `beton` varchar(10) DEFAULT NULL,
  `tgl_dokumen` date DEFAULT NULL,
  `no_dokumen` varchar(225) DEFAULT NULL,
  `id_asal` varchar(35) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `nilai` double DEFAULT NULL,
  `masa` text DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kib_d`
--

CREATE TABLE `kib_d` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `konstruksi` varchar(225) DEFAULT NULL,
  `panjang` double DEFAULT NULL,
  `lebar` double DEFAULT NULL,
  `luas` double DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tgl_dokumen` date DEFAULT NULL,
  `no_dokumen` varchar(225) DEFAULT NULL,
  `id_asal` varchar(35) DEFAULT NULL,
  `id_kondisi` varchar(35) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `masa` text DEFAULT NULL,
  `nilai` double DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `status` varchar(225) DEFAULT NULL,
  `file` text DEFAULT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kib_e`
--

CREATE TABLE `kib_e` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `ruang` varchar(225) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `judul` varchar(225) DEFAULT NULL,
  `pencipta` varchar(225) DEFAULT NULL,
  `spesifikasi` varchar(225) DEFAULT NULL,
  `asal` varchar(225) DEFAULT NULL,
  `cipta` varchar(225) DEFAULT NULL,
  `bahan` varchar(225) DEFAULT NULL,
  `jenis` varchar(225) DEFAULT NULL,
  `ukuran` varchar(225) DEFAULT NULL,
  `id_asal` varchar(35) DEFAULT NULL,
  `id_kondisi` varchar(35) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `masa` text DEFAULT NULL,
  `nilai` double DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kib_f`
--

CREATE TABLE `kib_f` (
  `id` varchar(35) NOT NULL,
  `kodep` varchar(25) DEFAULT NULL,
  `kodea` varchar(25) DEFAULT NULL,
  `tgl_beli` date DEFAULT NULL,
  `tgl_buku` date DEFAULT NULL,
  `luas` double DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tingkat` varchar(10) DEFAULT NULL,
  `beton` varchar(10) DEFAULT NULL,
  `tgl_dokumen` date DEFAULT NULL,
  `no_dokumen` varchar(225) DEFAULT NULL,
  `id_asal` varchar(35) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `status_tanah` text DEFAULT NULL,
  `kode_tanah` text DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `unitId` varchar(35) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lampiran`
--

CREATE TABLE `lampiran` (
  `id` int(11) NOT NULL,
  `file` varchar(250) NOT NULL,
  `fileRef` varchar(250) NOT NULL,
  `createdBy` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_asal`
--

CREATE TABLE `master_asal` (
  `id` varchar(35) NOT NULL,
  `uraian` varchar(225) NOT NULL,
  `keterangan` text NOT NULL,
  `unitId` varchar(30) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_asal`
--

INSERT INTO `master_asal` (`id`, `uraian`, `keterangan`, `unitId`, `userId`, `createAt`, `editedAt`) VALUES
('1wxkvxr1oocmkurs400', 'Pembelian', 'Aset diperoleh melalui proses pembelian resmi menggunakan anggaran', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:11:43', NULL),
('1wxkvxr1oocmkursafe', 'Hibah', 'Aset berasal dari pemberian pihak lain tanpa imbalan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:11:51', '2026-01-26 06:11:58'),
('1wxkvxr1oocmkursqcf', 'Bantuan Pemerintah', 'Aset diperoleh dari bantuan pemerintah pusat atau provinsi', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:12:12', NULL),
('1wxkvxr1oocmkursxnd', 'Swakelola', 'Aset dibangun atau dibuat secara mandiri oleh instansi', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:12:21', NULL),
('1wxkvxr1oocmkurt4q3', 'Tukar Menukar', 'Aset diperoleh melalui proses tukar menukar dengan aset lain', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:12:30', NULL),
('1wxkvxr1oocmkurtcjk', 'Rampasan', 'Aset berasal dari hasil rampasan atau sitaan negara', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:12:41', '2026-01-26 06:12:53'),
('1wxkvxr1oocmkurtwj4', 'Putusan Pengadilan', 'Aset diperoleh berdasarkan putusan pengadilan yang berkekuatan hukum tetap', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:13:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_hak`
--

CREATE TABLE `master_hak` (
  `id` varchar(35) NOT NULL,
  `uraian` varchar(225) NOT NULL,
  `keterangan` text NOT NULL,
  `unitId` varchar(30) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_hak`
--

INSERT INTO `master_hak` (`id`, `uraian`, `keterangan`, `unitId`, `userId`, `createAt`, `editedAt`) VALUES
('1wxkvxr1oocmkurjsfu', 'Pembelian', 'Aset diperoleh melalui pembelian menggunakan APBD', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:05:15', NULL),
('1wxkvxr1oocmkurk058', 'Hibah', 'Aset diperoleh melalui hibah dari pihak lain', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:05:25', NULL),
('1wxkvxr1oocmkurk9pd', 'Bantuan Pemerintah Pusat', 'Aset berasal dari bantuan Pemerintah Pusat', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:05:37', NULL),
('1wxkvxr1oocmkurkhn3', 'Bantuan Pemerintah Provinsi', 'Aset berasal dari bantuan Pemerintah Provinsi', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:05:47', NULL),
('1wxkvxr1oocmkurks2y', 'Bantuan Pemerintah Kabupaten/Kota', 'Aset berasal dari bantuan Pemerintah Kabupaten/Kota', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:06:01', NULL),
('1wxkvxr1oocmkurl1it', 'Tukar Menukar', 'Aset diperoleh melalui proses tukar menukar', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:06:13', NULL),
('1wxkvxr1oocmkurleja', 'Putusan Pengadilan', 'Aset diperoleh berdasarkan putusan pengadilan yang berkekuatan hukum tetap', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:06:30', NULL),
('1wxkvxr1oocmkurlohw', 'Penyertaan Modal Pemerintah Daerah', 'Aset diperoleh berdasarkan putusan pengadilan yang berkekuatan hukum tetap', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:06:43', NULL),
('1wxkvxr1oocmkurlvyl', 'Rampasan', 'Aset berasal dari barang rampasan negara', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:06:52', NULL),
('1wxkvxr1oocmkurm508', 'Hasil Sitaan', 'Aset berasal dari barang sitaan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:07:04', NULL),
('1wxkvxr1oocmkurmcwj', 'Lainnya', 'Aset diperoleh dari sumber lain yang sah', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 06:07:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_kondisi`
--

CREATE TABLE `master_kondisi` (
  `id` varchar(35) NOT NULL,
  `uraian` varchar(225) NOT NULL,
  `keterangan` text NOT NULL,
  `unitId` varchar(30) NOT NULL,
  `userId` varchar(25) NOT NULL,
  `createAt` timestamp NULL DEFAULT NULL,
  `editedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_kondisi`
--

INSERT INTO `master_kondisi` (`id`, `uraian`, `keterangan`, `unitId`, `userId`, `createAt`, `editedAt`) VALUES
('1wxkvxr1jfkmkuq2tkv', 'Baik', 'Aset dalam kondisi baik dan berfungsi normal', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:24:03', '2026-01-26 05:24:40'),
('1wxkvxr1oocmkuqi96b', 'Rusak Berat', 'Aset mengalami kerusakan berat dan tidak dapat digunakan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:36:03', NULL),
('1wxkvxr1oocmkuqilu2', 'Rusak Ringan', 'Aset mengalami kerusakan ringan namun masih dapat digunakan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:36:20', NULL),
('1wxkvxr1oocmkuqj0ac', 'Hilang', 'Aset tidak ditemukan atau hilang dalam penguasaan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:36:38', NULL),
('1wxkvxr1oocmkuqje9k', 'Dalam Pemeliharaan', 'Aset sedang dalam proses perbaikan atau pemeliharaan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:36:57', NULL),
('1wxkvxr1oocmkuqk088', 'Tidak Digunakan', 'Aset tidak digunakan dan berpotensi untuk pemanfaatan atau penghapusan', 'EtTbFb6EzYZt9mMJL', '3lqn31pojlltz3vvjq', '2026-01-26 05:37:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `icon` varchar(75) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `route` varchar(100) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `jenis` int(1) NOT NULL DEFAULT 1,
  `parrent` int(11) DEFAULT NULL,
  `urutan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `title`, `icon`, `color`, `route`, `type`, `jenis`, `parrent`, `urutan`) VALUES
(67, 'Homex', 'home', 'primary', '/', 0, 1, NULL, 1),
(72, 'Data Master', 'settings', 'deep-orange', '', 1, 1, NULL, 7),
(97, 'Otentikasi', '', '', '', 1, 2, 72, 0),
(98, 'List Menu', '', '', '/menuList', 0, 2, 97, 1),
(99, 'Kelompok User', '', '', '/klpUsers', 0, 2, 97, 0),
(100, 'Registrasi', '', '', '/registrasi', 0, 2, 97, 2),
(110, 'Kondisi Aset', '', '', '/kondisiAset', 0, 2, 72, 1),
(111, 'Data Entri', 'input', 'primary', '', 1, 1, NULL, 2),
(118, 'Penatausahaan', '', '', '', 1, 2, 111, 5),
(119, 'Tanah', '', '', '/tanah', 0, 2, 118, 1),
(120, 'Peralatan & Mesin', '', '', '/peralatanMesin', 0, 2, 118, 2),
(121, 'Gedung & Bangunan', '', '', '/gedungBangunan', 0, 2, 118, 3),
(122, 'Jalan, Irigasi dan Jaringan', '', '', '/jalanIrigasi', 0, 2, 118, 4),
(123, 'Aset Tetap Lainnya', '', '', '/asetTetapLainnya', 0, 2, 118, 5),
(124, 'Konstruksi dalam Pengerjaan', '', '', '/konstruksi', 0, 2, 118, 7),
(125, 'Aset Lainnya', '', '', '/asetLainnya', 0, 2, 118, 7),
(126, 'Pengadaan', '', '', '', 1, 2, 111, 2),
(127, 'Tanah', '', '', '/p_tanah', 0, 2, 126, 1),
(128, 'Peralatan & Mesin', '', '', '/p_peralatanMesin', 0, 2, 126, 2),
(129, 'Gedung & Bangunan', '', '', '/p_gedungBangunan', 0, 2, 126, 3),
(130, 'Jalan, Irigasi dan Jaringan', '', '', '/p_jalanIrigasi', 0, 2, 126, 4),
(131, 'Aset Tetap Lainnya', '', '', '/p_asetTetap', 0, 2, 126, 5),
(132, 'Konstruksi Dalam Pengerjaan', '', '', '/p_konstruksi', 0, 2, 126, 6),
(133, 'Aset Lainnya', '', '', '/p_asetLainnya', 0, 2, 126, 7),
(134, 'Asal Usul', '', '', '/asalUsul', 0, 2, 72, 2),
(135, 'Hak Tanah', '', '', '/hakTanah', 0, 2, 72, 3),
(136, 'Pengadaan', '', '', '/pengadaan', 0, 2, 126, 10);

-- --------------------------------------------------------

--
-- Table structure for table `menu_klp`
--

CREATE TABLE `menu_klp` (
  `id` int(11) NOT NULL,
  `uraian` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `menu_klp`
--

INSERT INTO `menu_klp` (`id`, `uraian`) VALUES
(1, 'Administrator'),
(2, 'Admin Dinas'),
(3, 'ASN');

-- --------------------------------------------------------

--
-- Table structure for table `menu_klp_list`
--

CREATE TABLE `menu_klp_list` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL COMMENT 'Id menu',
  `menu_klp_id` int(11) NOT NULL COMMENT 'id menu_klp',
  `readx` tinyint(1) NOT NULL DEFAULT 0,
  `updatex` tinyint(1) NOT NULL DEFAULT 0,
  `deletex` tinyint(1) NOT NULL DEFAULT 0,
  `addx` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `menu_klp_list`
--

INSERT INTO `menu_klp_list` (`id`, `menu_id`, `menu_klp_id`, `readx`, `updatex`, `deletex`, `addx`) VALUES
(1, 67, 1, 1, 1, 1, 1),
(2, 68, 1, 1, 1, 1, 1),
(3, 73, 1, 1, 1, 1, 1),
(4, 74, 1, 1, 1, 1, 1),
(5, 69, 1, 1, 1, 1, 1),
(6, 75, 1, 1, 1, 1, 1),
(7, 76, 1, 1, 1, 1, 1),
(8, 70, 1, 1, 1, 1, 1),
(9, 77, 1, 1, 1, 1, 1),
(10, 78, 1, 1, 1, 1, 1),
(11, 71, 1, 1, 1, 1, 1),
(12, 80, 1, 1, 1, 1, 1),
(13, 79, 1, 1, 1, 1, 1),
(14, 88, 1, 1, 1, 1, 1),
(15, 72, 1, 1, 1, 1, 1),
(16, 81, 1, 1, 1, 1, 1),
(17, 82, 1, 1, 1, 1, 1),
(18, 83, 1, 1, 1, 1, 1),
(19, 84, 1, 1, 1, 1, 1),
(20, 85, 1, 1, 1, 1, 1),
(21, 86, 1, 1, 1, 1, 1),
(22, 87, 1, 1, 1, 1, 1),
(23, 67, 2, 1, 1, 1, 1),
(24, 68, 2, 1, 1, 1, 1),
(25, 73, 2, 1, 1, 1, 1),
(26, 74, 2, 1, 1, 1, 1),
(27, 69, 2, 1, 1, 1, 1),
(28, 75, 2, 1, 1, 1, 1),
(29, 76, 2, 0, 0, 0, 0),
(30, 70, 2, 1, 1, 1, 1),
(31, 77, 2, 0, 0, 0, 0),
(32, 78, 2, 0, 0, 0, 0),
(33, 71, 2, 1, 1, 1, 1),
(34, 80, 2, 1, 1, 1, 1),
(35, 79, 2, 1, 1, 1, 1),
(36, 88, 2, 1, 1, 1, 1),
(37, 72, 2, 1, 1, 1, 1),
(38, 81, 2, 0, 0, 0, 0),
(39, 82, 2, 0, 0, 0, 0),
(40, 83, 2, 0, 0, 0, 0),
(41, 84, 2, 0, 0, 0, 0),
(42, 85, 2, 0, 0, 0, 0),
(43, 86, 2, 0, 0, 0, 0),
(44, 87, 2, 0, 0, 0, 0),
(45, 67, 3, 1, 1, 1, 1),
(46, 68, 3, 1, 1, 1, 1),
(47, 73, 3, 0, 0, 0, 0),
(48, 74, 3, 0, 0, 0, 0),
(49, 69, 3, 1, 1, 1, 1),
(50, 75, 3, 0, 0, 0, 0),
(51, 76, 3, 0, 0, 0, 0),
(52, 70, 3, 1, 1, 1, 1),
(53, 77, 3, 0, 0, 0, 0),
(54, 78, 3, 0, 0, 0, 0),
(55, 71, 3, 1, 1, 1, 1),
(56, 80, 3, 1, 1, 1, 1),
(57, 79, 3, 1, 1, 1, 1),
(58, 88, 3, 1, 0, 0, 0),
(59, 72, 3, 1, 1, 1, 1),
(60, 81, 3, 0, 0, 0, 0),
(61, 82, 3, 0, 0, 0, 0),
(62, 83, 3, 0, 0, 0, 0),
(63, 84, 3, 0, 0, 0, 0),
(64, 85, 3, 0, 0, 0, 0),
(65, 86, 3, 0, 0, 0, 0),
(66, 87, 3, 0, 0, 0, 0),
(67, 90, 1, 1, 1, 1, 1),
(68, 91, 1, 0, 0, 0, 0),
(69, 92, 1, 1, 1, 1, 1),
(70, 93, 1, 1, 1, 1, 1),
(71, 94, 1, 1, 1, 1, 1),
(72, 95, 1, 1, 1, 1, 1),
(73, 96, 1, 1, 1, 1, 1),
(74, 93, 1, 0, 0, 0, 0),
(75, 94, 1, 0, 0, 0, 0),
(76, 95, 1, 0, 0, 0, 0),
(77, 96, 1, 0, 0, 0, 0),
(78, 93, 3, 0, 0, 0, 0),
(79, 94, 3, 0, 0, 0, 0),
(80, 95, 3, 0, 0, 0, 0),
(81, 96, 3, 0, 0, 0, 0),
(82, 93, 3, 0, 0, 0, 0),
(83, 94, 3, 0, 0, 0, 0),
(84, 95, 3, 0, 0, 0, 0),
(85, 96, 3, 0, 0, 0, 0),
(86, 100, 1, 1, 1, 1, 1),
(87, 97, 1, 0, 0, 0, 0),
(88, 99, 1, 1, 1, 1, 1),
(89, 98, 1, 1, 1, 1, 1),
(90, 97, 3, 0, 0, 0, 0),
(91, 99, 3, 0, 0, 0, 0),
(92, 98, 3, 0, 0, 0, 0),
(93, 100, 3, 0, 0, 0, 0),
(94, 101, 1, 1, 1, 1, 1),
(95, 101, 3, 0, 0, 0, 0),
(96, 102, 1, 1, 1, 1, 1),
(97, 103, 1, 1, 1, 1, 1),
(98, 103, 3, 0, 0, 0, 0),
(99, 102, 3, 1, 1, 1, 1),
(100, 104, 3, 1, 1, 1, 1),
(101, 104, 1, 1, 1, 1, 1),
(102, 107, 1, 1, 1, 1, 1),
(103, 99, 2, 0, 0, 0, 0),
(104, 97, 2, 0, 0, 0, 0),
(105, 104, 2, 0, 0, 0, 0),
(106, 98, 2, 0, 0, 0, 0),
(107, 101, 2, 0, 0, 0, 0),
(108, 100, 2, 0, 0, 0, 0),
(109, 102, 2, 0, 0, 0, 0),
(110, 103, 2, 0, 0, 0, 0),
(111, 107, 2, 0, 0, 0, 0),
(112, 107, 3, 0, 0, 0, 0),
(113, 108, 1, 1, 1, 1, 1),
(114, 109, 3, 1, 1, 1, 1),
(115, 108, 3, 0, 0, 0, 0),
(116, 109, 1, 1, 1, 1, 1),
(117, 110, 1, 1, 1, 1, 1),
(118, 116, 1, 1, 1, 1, 1),
(119, 114, 1, 1, 1, 1, 1),
(120, 113, 1, 1, 1, 1, 1),
(121, 111, 1, 0, 0, 0, 0),
(122, 112, 1, 1, 1, 1, 1),
(123, 115, 1, 1, 1, 1, 1),
(124, 123, 1, 1, 1, 1, 1),
(125, 125, 1, 1, 1, 1, 1),
(126, 120, 1, 1, 1, 1, 1),
(127, 118, 1, 0, 0, 0, 0),
(128, 121, 1, 1, 1, 1, 1),
(129, 119, 1, 1, 1, 1, 1),
(130, 122, 1, 1, 1, 1, 1),
(131, 124, 1, 1, 1, 1, 1),
(132, 126, 1, 0, 0, 0, 0),
(133, 130, 1, 0, 0, 0, 0),
(134, 131, 1, 0, 0, 0, 0),
(135, 128, 1, 0, 0, 0, 0),
(136, 132, 1, 0, 0, 0, 0),
(137, 129, 1, 0, 0, 0, 0),
(138, 133, 1, 0, 0, 0, 0),
(139, 127, 1, 1, 1, 1, 1),
(140, 134, 1, 1, 1, 1, 1),
(141, 135, 1, 1, 1, 1, 1),
(142, 136, 1, 1, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kib_a`
--
ALTER TABLE `kib_a`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kib_b`
--
ALTER TABLE `kib_b`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kib_c`
--
ALTER TABLE `kib_c`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kib_d`
--
ALTER TABLE `kib_d`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kib_e`
--
ALTER TABLE `kib_e`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kib_f`
--
ALTER TABLE `kib_f`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `lampiran`
--
ALTER TABLE `lampiran`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `master_asal`
--
ALTER TABLE `master_asal`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `master_hak`
--
ALTER TABLE `master_hak`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `master_kondisi`
--
ALTER TABLE `master_kondisi`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `parrent` (`parrent`) USING BTREE,
  ADD KEY `id` (`id`) USING BTREE,
  ADD KEY `jenis` (`jenis`) USING BTREE;

--
-- Indexes for table `menu_klp`
--
ALTER TABLE `menu_klp`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `menu_klp_list`
--
ALTER TABLE `menu_klp_list`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `menu_klp_id` (`menu_klp_id`) USING BTREE,
  ADD KEY `id` (`id`) USING BTREE,
  ADD KEY `menu_id` (`menu_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lampiran`
--
ALTER TABLE `lampiran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `menu_klp`
--
ALTER TABLE `menu_klp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu_klp_list`
--
ALTER TABLE `menu_klp_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
