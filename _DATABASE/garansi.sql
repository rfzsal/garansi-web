-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2023 at 06:42 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `garansi`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_garansi`
--

CREATE TABLE `data_garansi` (
  `id` varchar(16) NOT NULL,
  `nama_produk` varchar(75) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_akhir` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `data_klaim`
--

CREATE TABLE `data_klaim` (
  `id` varchar(10) NOT NULL,
  `id_garansi` varchar(16) NOT NULL,
  `no_telepon` varchar(15) NOT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'Dalam proses pengajuan',
  `keterangan` varchar(255) NOT NULL,
  `tanggal_klaim` datetime NOT NULL,
  `gambar` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `data_pengguna`
--

CREATE TABLE `data_pengguna` (
  `username` varchar(10) NOT NULL,
  `password` char(60) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `data_pengguna`
--

INSERT INTO `data_pengguna` (`username`, `password`, `role`) VALUES
('admin', '$2b$10$SLuvW5K059PjjKxD5UMlGOa47g2J000jOSgL2l3yqgw5Iz4VNafHy', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `status_klaim`
--

CREATE TABLE `status_klaim` (
  `id_klaim` varchar(10) NOT NULL,
  `keterangan` varchar(255) NOT NULL DEFAULT '-',
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_garansi`
--
ALTER TABLE `data_garansi`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `data_klaim`
--
ALTER TABLE `data_klaim`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id_garansi` (`id_garansi`);

--
-- Indexes for table `data_pengguna`
--
ALTER TABLE `data_pengguna`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `status_klaim`
--
ALTER TABLE `status_klaim`
  ADD KEY `status_klaim_ibfk_1` (`id_klaim`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_klaim`
--
ALTER TABLE `data_klaim`
  ADD CONSTRAINT `data_klaim_ibfk_1` FOREIGN KEY (`id_garansi`) REFERENCES `data_garansi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `status_klaim`
--
ALTER TABLE `status_klaim`
  ADD CONSTRAINT `status_klaim_ibfk_1` FOREIGN KEY (`id_klaim`) REFERENCES `data_klaim` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
