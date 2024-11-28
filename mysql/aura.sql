-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mai_aura
CREATE DATABASE IF NOT EXISTS `mai_aura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mai_aura`;

-- Dumping structure for table mai_aura.banner
CREATE TABLE IF NOT EXISTS `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_banner` varchar(255) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.banner: ~6 rows (approximately)
INSERT INTO `banner` (`id`, `image_banner`, `is_visible`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'test.jpg', 0, 1, '2024-05-07 23:46:28', 'admin', '2024-05-07 23:46:29', 'admin'),
	(2, '6b35e050-c613-4c5c-9cbe-b91b535b3422.png', 0, 0, '2024-05-08 16:48:21', 'admin', '2024-05-08 16:48:21', NULL),
	(3, '9c9146a0-e18a-4197-b751-6e2679a9dcfe.png', 0, 1, '2024-05-09 09:36:51', 'admin', '2024-05-09 09:36:51', NULL),
	(4, '53984848-6bde-4e25-86a1-9e573a0340f4.png', 0, 1, '2024-05-09 09:37:31', 'admin', '2024-05-09 09:37:31', NULL),
	(5, 'a5e64a07-3ff6-4494-b439-4b9ac2473b46.jpg', 1, 1, '2024-05-19 02:52:38', 'admin', '2024-05-19 02:52:38', NULL),
	(6, 'e8f581de-9398-4dda-b5b7-67cf721ca069.jpg', 1, 1, '2024-05-19 02:52:44', 'admin', '2024-05-19 02:52:44', NULL);

-- Dumping structure for table mai_aura.bill
CREATE TABLE IF NOT EXISTS `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_code` varchar(50) DEFAULT NULL,
  `reciver` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `bill_note` text,
  `total_price` decimal(20,6) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.bill: ~18 rows (approximately)
INSERT INTO `bill` (`id`, `bill_code`, `reciver`, `phone_number`, `email`, `address`, `bill_note`, `total_price`, `status`, `payment_method`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(2, 'HD001', 'Đại TT', '098853455', 'trinhdai@gmail.com', NULL, NULL, 3000000.000000, 3, NULL, '2024-05-20 16:28:17', NULL, NULL, NULL),
	(4, 'HD002', 'Trịnh Đại', '09876342', NULL, 'Hà Nội', NULL, 2400000.000000, 1, NULL, '2024-05-25 14:01:40', 'daitt01', NULL, NULL),
	(6, 'HD003', 'Trịnh Đại', '09876342', NULL, 'Hà Nội', NULL, 2400000.000000, 1, NULL, '2024-05-25 14:03:05', 'daitt01', NULL, NULL),
	(7, 'HD004', 'Trịnh Đại', '09876342', NULL, NULL, NULL, 9600000.000000, 1, 1, '2024-05-26 06:36:07', 'daitt01', NULL, NULL),
	(8, 'HD005', 'Trịnh Đại', '09876342', NULL, NULL, NULL, 2400000.000000, 1, 1, '2024-05-26 06:36:51', 'daitt01', NULL, NULL),
	(9, 'HD006', 'Trịnh Đại', '09876342', NULL, NULL, NULL, 2400000.000000, 1, 2, '2024-05-26 07:03:56', 'daitt01', NULL, NULL),
	(10, 'HD007', 'Trịnh Đại', '09876342', NULL, NULL, NULL, 2400000.000000, 1, 2, '2024-05-26 07:04:23', 'daitt01', NULL, NULL),
	(11, 'HD008', 'Trịnh Đại', '09876342', NULL, NULL, NULL, 1200000.000000, 1, 2, '2024-05-26 07:06:29', 'daitt01', NULL, NULL),
	(12, 'HD009', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1200000.000000, 1, 1, '2024-05-26 17:25:37', 'admin1', NULL, NULL),
	(13, 'HD010', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 01:04:30', 'admin1', NULL, NULL),
	(14, 'HD011', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 3000000.000000, 2, 1, '2024-05-27 01:10:11', 'admin1', NULL, NULL),
	(15, 'HD012', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 3000000.000000, 1, 1, '2024-05-27 01:12:10', 'admin1', NULL, NULL),
	(16, 'HD013', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 01:20:51', 'admin1', NULL, NULL),
	(17, 'HD014', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 3, 1, '2024-05-27 01:30:10', 'admin1', NULL, NULL),
	(18, 'HD015', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 08:04:49', 'admin1', NULL, NULL),
	(19, 'HD016', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 08:09:11', 'admin1', NULL, NULL),
	(20, 'HD017', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 750000.000000, 1, 1, '2024-05-27 08:10:08', 'admin1', NULL, NULL),
	(21, 'HD018', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 08:13:37', 'admin1', NULL, NULL),
	(22, 'HD019', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 08:14:38', 'admin1', NULL, NULL),
	(23, 'HD020', 'Đại TT', '0838734', 'dsfhdsbfd', NULL, NULL, 1500000.000000, 1, 1, '2024-05-27 08:28:27', 'admin1', NULL, NULL);

-- Dumping structure for table mai_aura.bill_product
CREATE TABLE IF NOT EXISTS `bill_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(20,4) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `sales` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.bill_product: ~21 rows (approximately)
INSERT INTO `bill_product` (`id`, `bill_id`, `product_id`, `quantity`, `price`, `size`, `color`, `created_at`, `sales`) VALUES
	(1, 2, 7, 10, 1500000.0000, 'M', 'Xanh biển in', '2024-03-20', NULL),
	(2, 2, 7, 20, 1500000.0000, 'M', 'Xanh biển in', '2024-04-20', NULL),
	(3, 3, 6, 9, 1200000.0000, 'S', 'Trắng in họa tiết AR', '2024-05-20', NULL),
	(4, 4, 6, 2, 1200000.0000, 'S', 'Trắng in họa tiết AR', '2024-05-25', NULL),
	(5, 6, 6, 2, 1200000.0000, 'S', 'Trắng in họa tiết AR', '2024-05-25', NULL),
	(6, 7, 6, 8, 1200000.0000, 'M', 'Trắng in họa tiết AR', '2024-05-26', NULL),
	(7, 8, 6, 2, 1200000.0000, 'M', 'Trắng in họa tiết AR', '2024-05-26', NULL),
	(8, 9, 6, 2, 1200000.0000, 'M', 'Trắng in họa tiết AR', '2024-05-26', NULL),
	(9, 10, 6, 2, 1200000.0000, 'M', 'Trắng in họa tiết AR', '2024-05-26', NULL),
	(10, 11, 6, 1, 1200000.0000, 'S', 'Trắng in họa tiết AR', '2024-05-26', NULL),
	(11, 12, 6, 1, 1200000.0000, 'S', 'Trắng in họa tiết AR', '2024-05-27', NULL),
	(12, 13, 7, 1, 1500000.0000, 'M', 'Xanh biển in', '2024-05-27', NULL),
	(13, 14, 7, 2, 1500000.0000, 'M', 'Xanh biển in', '2024-05-27', NULL),
	(14, 15, 7, 1, 1500000.0000, 'L', 'Xanh biển in', '2024-05-27', NULL),
	(15, 15, 7, 1, 1500000.0000, 'L', 'Xanh biển in', '2024-05-27', NULL),
	(16, 16, 7, 1, 1500000.0000, 'L', 'Đen kẻ trắng', '2024-05-27', NULL),
	(17, 17, 7, 1, 1500000.0000, 'M', 'Xanh biển in', '2024-05-27', NULL),
	(18, 18, 24, 2, 750000.0000, 'S', 'Xanh cổ vịt 9', '2024-05-27', NULL),
	(19, 19, 24, 2, 750000.0000, 'M', 'Xanh cổ vịt 9', '2024-05-27', NULL),
	(20, 20, 24, 1, 750000.0000, 'M', 'Xanh cổ vịt 9', '2024-05-27', NULL),
	(21, 21, 24, 2, 750000.0000, 'M', 'Xanh cổ vịt 9', '2024-05-27', NULL),
	(22, 22, 24, 2, 750000.0000, 'L', 'Xanh cổ vịt 9', '2024-05-27', NULL),
	(23, 23, 24, 2, 750000.0000, 'S', 'Xanh cổ vịt 9', '2024-05-27', NULL);

-- Dumping structure for table mai_aura.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.category: ~14 rows (approximately)
INSERT INTO `category` (`id`, `parent_id`, `category_name`, `is_visible`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, NULL, 'Áo', NULL, 1, '2024-05-06 00:05:08', 'admin', '2024-05-06 14:24:08', NULL),
	(2, NULL, 'Quần', NULL, 1, '2024-05-05 17:58:24', 'admin', '2024-05-05 17:58:24', NULL),
	(3, 1, 'Áo 1', NULL, 0, '2024-05-05 17:59:20', 'admin', '2024-05-07 02:45:17', NULL),
	(4, NULL, 'Phụ kiện', NULL, 1, '2024-05-05 17:59:52', 'admin', '2024-05-19 03:02:36', NULL),
	(5, NULL, 'Quần 1.1', NULL, 0, '2024-05-05 18:23:43', 'admin', '2024-05-05 18:23:43', NULL),
	(6, NULL, 'Quần 1.2', NULL, 0, '2024-05-05 18:24:15', 'admin', '2024-05-05 18:24:15', NULL),
	(7, NULL, 'Quần 1.5', NULL, 0, '2024-05-05 18:24:25', 'admin', '2024-05-05 18:26:01', NULL),
	(8, 1, 'Áo sơ mi', NULL, 1, '2024-05-07 02:46:47', 'admin', '2024-05-23 08:28:03', NULL),
	(9, 4, 'Quần 5', NULL, 0, '2024-05-07 02:47:20', 'admin', '2024-05-07 02:47:20', NULL),
	(10, 1, 'Áo Polo', NULL, 1, '2024-05-08 02:46:22', 'admin', '2024-05-23 08:28:11', NULL),
	(11, 4, 'Quần 5', NULL, 0, '2024-05-08 02:47:41', 'admin', '2024-05-08 02:47:41', NULL),
	(12, NULL, NULL, NULL, 0, '2024-05-22 09:56:27', 'admin', '2024-05-22 09:56:27', NULL),
	(13, 2, 'Quần Âu', NULL, 1, '2024-05-27 05:17:30', 'admin', '2024-05-27 05:17:30', NULL),
	(14, 2, 'Quần Jeans', NULL, 1, '2024-05-27 05:17:40', 'admin', '2024-05-27 05:17:40', NULL);

-- Dumping structure for table mai_aura.collection
CREATE TABLE IF NOT EXISTS `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.collection: ~8 rows (approximately)
INSERT INTO `collection` (`id`, `name`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'Xuân hè', 0, '2024-05-16 23:18:50', 'admin', '2024-05-16 23:18:54', 'admin'),
	(2, NULL, 0, '2024-05-16 17:02:01', 'admin', '2024-05-16 17:02:01', NULL),
	(3, 'Bộ 1', 0, '2024-05-16 17:02:32', 'admin', '2024-05-16 17:26:33', NULL),
	(4, 'Bộ 4', 0, '2024-05-16 17:04:36', 'admin', '2024-05-16 17:28:34', NULL),
	(5, 'H5', 0, '2024-05-16 17:05:40', 'admin', '2024-05-16 17:05:40', NULL),
	(6, 'B6', 0, '2024-05-16 17:06:36', 'admin', '2024-05-16 17:06:36', NULL),
	(7, 'Bản lĩnh Việt Nam', 1, '2024-05-27 05:40:06', 'admin', '2024-05-27 05:40:06', NULL),
	(8, 'HOA CỦA BIỂN - ÁNH DƯƠNG COLLECTION 2024', 1, '2024-05-27 05:55:55', 'admin', '2024-05-27 05:57:25', NULL),
	(9, 'METRO MODE', 1, '2024-05-27 06:26:36', 'admin', '2024-05-27 06:26:36', NULL),
	(10, 'Dandy Summner', 1, '2024-05-27 06:33:18', 'admin', '2024-05-27 06:33:18', NULL);

-- Dumping structure for table mai_aura.collection_product
CREATE TABLE IF NOT EXISTS `collection_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_collection` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.collection_product: ~25 rows (approximately)
INSERT INTO `collection_product` (`id`, `id_collection`, `id_product`) VALUES
	(1, 6, 2),
	(2, 6, 3),
	(3, 6, 4),
	(4, 4, NULL),
	(5, 4, NULL),
	(6, 7, 9),
	(7, 7, 7),
	(8, 7, 11),
	(9, 7, 12),
	(15, 8, 17),
	(16, 8, 19),
	(17, 8, 21),
	(18, 8, 7),
	(19, 8, 6),
	(20, 9, 8),
	(21, 9, 11),
	(22, 9, 22),
	(23, 10, 8),
	(24, 10, 11),
	(25, 10, 22),
	(26, 10, 20),
	(27, 10, 9),
	(28, 10, 11),
	(29, 10, 6),
	(30, 10, 22);

-- Dumping structure for table mai_aura.color
CREATE TABLE IF NOT EXISTS `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.color: ~26 rows (approximately)
INSERT INTO `color` (`id`, `color`, `is_active`, `updated_at`, `updated_by`, `created_at`, `created_by`) VALUES
	(1, 'Trắng', 1, '2024-05-27 11:05:03', NULL, '2024-05-27 11:05:02', NULL),
	(2, 'Trắng in họa tiết AR', 1, '2024-05-27 11:05:04', NULL, '2024-05-27 11:05:00', NULL),
	(3, 'Trắng kẻ xanh', 1, '2024-05-27 11:05:05', NULL, '2024-05-27 11:05:00', NULL),
	(4, 'Đen kẻ trắng', 1, '2024-05-27 11:05:06', NULL, '2024-05-27 11:04:59', NULL),
	(5, 'Xanh biển in', 1, '2024-05-27 11:05:06', NULL, '2024-05-27 11:04:58', NULL),
	(6, 'Đen 21', 1, '2024-05-27 04:04:46', NULL, '2024-05-27 04:04:46', 'dattt'),
	(7, 'Xám 55', 1, '2024-05-27 04:05:48', NULL, '2024-05-27 04:05:48', 'dattt'),
	(8, 'Đen 1', 1, '2024-05-27 04:06:10', NULL, '2024-05-27 04:06:10', 'dattt'),
	(9, 'BE 074MF', 1, '2024-05-27 04:06:28', NULL, '2024-05-27 04:06:28', 'dattt'),
	(10, 'Xám nhạt 328', 1, '2024-05-27 04:06:43', NULL, '2024-05-27 04:06:43', 'dattt'),
	(11, 'Xanh chàm sáng', 1, '2024-05-27 04:07:08', NULL, '2024-05-27 04:07:08', 'dattt'),
	(12, 'Xanh chàm đậm', 1, '2024-05-27 04:07:22', NULL, '2024-05-27 04:07:22', 'dattt'),
	(13, 'Xanh chàm đậm', 1, '2024-05-27 04:07:41', NULL, '2024-05-27 04:07:41', 'dattt'),
	(14, 'Xanh chàm nhạt', 1, '2024-05-27 04:07:56', NULL, '2024-05-27 04:07:56', 'dattt'),
	(15, 'Xanh chàm đậm', 1, '2024-05-27 04:08:10', NULL, '2024-05-27 04:08:10', 'dattt'),
	(16, 'Xám kẻ trắng xanh', 1, '2024-05-27 04:22:25', NULL, '2024-05-27 04:22:25', 'dattt'),
	(17, 'Đen solid', 1, '2024-05-27 04:27:49', NULL, '2024-05-27 04:27:49', 'dattt'),
	(18, 'Xám in họa tiết', 1, '2024-05-27 04:32:33', NULL, '2024-05-27 04:32:33', 'dattt'),
	(19, 'Xanh tím than kẻ', 1, '2024-05-27 04:37:53', NULL, '2024-05-27 04:37:53', 'dattt'),
	(20, 'Trắng kẻ đỏ', 1, '2024-05-27 04:45:57', NULL, '2024-05-27 04:45:57', 'dattt'),
	(21, 'Xanh lá 085 MF', 1, '2024-05-27 04:49:27', NULL, '2024-05-27 04:49:27', 'dattt'),
	(22, 'Xanh tím than 45 mf', 1, '2024-05-27 04:49:37', NULL, '2024-05-27 04:49:37', 'dattt'),
	(23, 'Cam 102 in', 1, '2024-05-27 04:52:03', NULL, '2024-05-27 04:52:03', 'dattt'),
	(24, 'Xanh tím than 41', 1, '2024-05-27 04:54:01', NULL, '2024-05-27 04:54:01', 'dattt'),
	(25, 'Xanh biển 223', 1, '2024-05-27 05:08:45', NULL, '2024-05-27 05:08:45', 'dattt'),
	(26, 'Đỏ 20', 1, '2024-05-27 05:13:21', NULL, '2024-05-27 05:13:21', 'dattt'),
	(27, 'Xám 37', 1, '2024-05-27 05:23:10', NULL, '2024-05-27 05:23:10', 'dattt'),
	(28, 'Xanh cổ vịt 9', 1, '2024-05-27 05:30:13', NULL, '2024-05-27 05:30:13', 'dattt');

-- Dumping structure for table mai_aura.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `entity_type` int(11) DEFAULT NULL,
  `content` text,
  `rate` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.comment: ~0 rows (approximately)

-- Dumping structure for table mai_aura.conversation
CREATE TABLE IF NOT EXISTS `conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_name` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.conversation: ~0 rows (approximately)

-- Dumping structure for table mai_aura.delivery_address
CREATE TABLE IF NOT EXISTS `delivery_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address` text,
  `is_fixed` tinyint(1) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.delivery_address: ~0 rows (approximately)

-- Dumping structure for table mai_aura.favourite
CREATE TABLE IF NOT EXISTS `favourite` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.favourite: ~0 rows (approximately)

-- Dumping structure for table mai_aura.file_name_dictionary
CREATE TABLE IF NOT EXISTS `file_name_dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `saved_file_name` varchar(255) DEFAULT NULL,
  `entity_type` int(11) DEFAULT NULL,
  `file_index` int(11) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_draft` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.file_name_dictionary: ~212 rows (approximately)
INSERT INTO `file_name_dictionary` (`id`, `parent_id`, `file_name`, `saved_file_name`, `entity_type`, `file_index`, `size`, `is_active`, `is_draft`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, NULL, 'han1.png', '13bba77e-3d94-4084-b79f-e90e3a8f1182.png', NULL, NULL, 1032516, NULL, 1, '2024-05-08 16:09:19', NULL, NULL, NULL),
	(2, NULL, 'han1.png', '6df6a68c-15de-4ea9-aa4b-e5a95f7263d1.png', NULL, NULL, 1032516, NULL, 1, '2024-05-08 16:44:33', NULL, NULL, NULL),
	(3, NULL, 'nam1.png', '436a253a-61c2-4bc3-b0ee-a5d090655d05.png', NULL, NULL, 772857, NULL, 1, '2024-05-08 16:45:42', NULL, NULL, NULL),
	(4, NULL, 's1.png', '83db34cf-bdab-4ded-92d5-c3136b0245e4.png', NULL, NULL, 360480, NULL, 1, '2024-05-08 16:46:22', NULL, NULL, NULL),
	(5, NULL, 'nam1.png', 'a741b4a3-c45c-4c8e-a00b-b5ed152fc9be.png', NULL, NULL, 772857, NULL, 1, '2024-05-08 16:47:18', NULL, NULL, NULL),
	(6, NULL, 'nam2.png', '6b35e050-c613-4c5c-9cbe-b91b535b3422.png', NULL, NULL, 210069, NULL, 1, '2024-05-08 16:48:20', NULL, NULL, NULL),
	(7, NULL, 'dolphin-76.png', '5387c97e-7de2-4cca-ada4-563d3d15ad8b.png', NULL, NULL, 533532, NULL, 1, '2024-05-09 09:32:55', NULL, NULL, NULL),
	(8, NULL, 'nam2.png', 'a07e52b8-9312-4cd7-89ad-0e3769584caf.png', NULL, NULL, 210069, NULL, 1, '2024-05-09 09:35:38', NULL, NULL, NULL),
	(9, NULL, 'dolphin-76.png', '8ca06f84-9fc5-4415-ad90-f85b4a53141e.png', NULL, NULL, 533532, NULL, 1, '2024-05-09 09:36:11', NULL, NULL, NULL),
	(10, NULL, 'nam1.png', '9c9146a0-e18a-4197-b751-6e2679a9dcfe.png', NULL, NULL, 772857, NULL, 1, '2024-05-09 09:36:48', NULL, NULL, NULL),
	(11, NULL, 'u1.png', '53984848-6bde-4e25-86a1-9e573a0340f4.png', NULL, NULL, 260457, NULL, 1, '2024-05-09 09:37:30', NULL, NULL, NULL),
	(12, NULL, 'image_2024-05-09_22-48-16.png', 'd1a9d39c-c1d4-41e1-a11b-9153523a7640.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 17:59:09', NULL, NULL, NULL),
	(13, NULL, 'image_2024-05-09_22-48-16.png', '58f464fb-4af5-4562-a851-7849b9712f86.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 18:07:01', NULL, NULL, NULL),
	(14, NULL, 'image_2024-05-09_22-48-16.png', '62b96c58-9c31-48c9-aaad-6c7c180dc20a.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 18:08:15', NULL, NULL, NULL),
	(15, NULL, 'image_2024-05-09_22-48-16.png', '65e603e1-8457-4d5e-843a-661a1db4b1f6.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 18:09:31', NULL, NULL, NULL),
	(16, NULL, 'image_2024-05-09_22-48-16.png', '612a9a48-cc7c-4afe-b652-14390a4e81bd.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 18:10:51', NULL, NULL, NULL),
	(17, NULL, 'image_2024-05-09_22-48-16.png', '4a07e7f4-091e-4768-853f-3b76c62d4da0.png', NULL, NULL, 13730, NULL, 1, '2024-05-09 18:13:26', NULL, NULL, NULL),
	(18, NULL, 'han2.png', '906b516c-f4bc-498a-b266-8f798b98b6a9.png', NULL, NULL, 194594, NULL, 1, '2024-05-10 03:06:50', NULL, NULL, NULL),
	(19, NULL, 'han1.png', '48cdc0cd-8dea-4e85-9ec2-25badcc03e69.png', NULL, NULL, 1032516, NULL, 1, '2024-05-10 03:07:47', NULL, NULL, NULL),
	(20, NULL, 'dolphin-76.png', '67e3b24a-70c6-4343-94cd-94e3bd3c54f2.png', NULL, NULL, 533532, NULL, 1, '2024-05-10 03:09:14', NULL, NULL, NULL),
	(21, NULL, 'han2.png', '85cd70ad-460a-471f-8120-b4cbab04b243.png', NULL, NULL, 194594, NULL, 1, '2024-05-10 03:11:19', NULL, NULL, NULL),
	(22, NULL, 'ATINO.png', 'de3c4fb0-88db-4871-8f89-81933e3a9173.png', NULL, NULL, 13888, NULL, 1, '2024-05-10 03:28:57', NULL, NULL, NULL),
	(23, NULL, 'image_2024-05-09_22-48-16.png', '95678bfa-d3e1-4c27-9e3a-37760a7e1df6.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 10:21:34', NULL, NULL, NULL),
	(24, NULL, 'han2.png', 'a13222b1-c863-42e5-8c39-d321a4d13c2f.png', NULL, NULL, 194594, NULL, 1, '2024-05-10 10:22:06', NULL, NULL, NULL),
	(25, NULL, 'image_2024-05-09_22-48-16.png', 'abb89d35-30c8-4d14-8f94-2519d971bd21.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 10:28:24', NULL, NULL, NULL),
	(26, NULL, 'image_2024-05-09_22-48-16.png', 'db78143b-1433-4140-b4df-875660dc7531.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 10:29:44', NULL, NULL, NULL),
	(27, NULL, 'Frame.png', 'be3b294e-90aa-4334-8d8f-9b30c774255d.png', NULL, NULL, 1800, NULL, 1, '2024-05-10 11:01:44', NULL, NULL, NULL),
	(28, NULL, 'file.pdf', 'fff42af4-cdfc-4505-9252-ee77de92b903.pdf', NULL, NULL, 60730, NULL, 1, '2024-05-10 11:06:05', NULL, NULL, NULL),
	(29, NULL, 'image_2024-05-09_22-48-16.png', '1bfcfc63-2eee-4202-9b71-bbccb2906bac.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 11:15:53', NULL, NULL, NULL),
	(30, NULL, 'image_2024-05-09_22-48-16.png', 'd4370aa7-7a6d-4ed8-af77-973e81b4d175.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 11:16:49', NULL, NULL, NULL),
	(31, NULL, 'image_2024-05-09_22-48-16.png', '7e50fd33-fe50-441b-94fa-21c50d8d053d.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 11:17:38', NULL, NULL, NULL),
	(32, NULL, 'image_2024-05-09_22-48-16.png', 'ec5527f4-93d8-40af-8ef1-019507df92b0.png', NULL, NULL, 13730, NULL, 1, '2024-05-10 11:18:52', NULL, NULL, NULL),
	(33, NULL, 'image_2024-05-09_22-48-16.png', '6148e69f-e8f2-44a7-aad7-03e92f971817.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 04:43:44', NULL, NULL, NULL),
	(34, NULL, 'image_2024-05-09_22-48-16.png', '462be664-e131-4c3f-9832-9f5a0040826e.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 04:44:39', NULL, NULL, NULL),
	(35, NULL, 'image_2024-05-09_22-48-16.png', '3edd91cb-2557-43d6-90bf-66c3cbf9ce1a.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 04:45:56', NULL, NULL, NULL),
	(36, NULL, 'image_2024-05-09_22-48-16.png', 'ddc68580-6e41-4e76-b222-dcbadfc1b1b5.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 04:47:44', NULL, NULL, NULL),
	(37, NULL, 'image_2024-05-09_22-48-16.png', '46b6bf74-5072-406e-938c-9d5738d7cde6.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 04:49:55', NULL, NULL, NULL),
	(38, NULL, 'image_2024-05-09_22-48-16.png', 'd7ce265a-f4f5-4b0f-bbfd-08022e4b6ea4.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 06:36:56', NULL, NULL, NULL),
	(39, NULL, 'nam1.png', '33b3494e-c777-4e1b-a80d-b3d6b36d4c59.png', NULL, NULL, 772857, NULL, 1, '2024-05-11 08:15:37', NULL, NULL, NULL),
	(40, NULL, 'nam2.png', '46846690-8b86-409c-be2e-77892b647e13.png', NULL, NULL, 210069, NULL, 1, '2024-05-11 08:15:37', NULL, NULL, NULL),
	(41, NULL, 's1.png', '96b71cbd-7e2a-4dd5-bfe9-cc224dd07d6d.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:19:06', NULL, NULL, NULL),
	(42, NULL, 's2.png', '1cd08d0c-9488-427e-b399-a0dac20cac56.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:19:06', NULL, NULL, NULL),
	(43, NULL, 'image_2024-05-09_22-48-16.png', '9ee86501-9141-4796-a4e2-0a525bbdbb7f.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 08:29:43', NULL, NULL, NULL),
	(44, NULL, 'dolphin-76.png', 'b45c89d8-d370-43f0-b7db-d14e80060760.png', NULL, NULL, 533532, NULL, 1, '2024-05-11 08:30:20', NULL, NULL, NULL),
	(45, NULL, 'Frame.png', '8b876b2f-2231-49b3-942d-d119f5c61abf.png', NULL, NULL, 1800, NULL, 1, '2024-05-11 08:30:20', NULL, NULL, NULL),
	(46, NULL, 'han2.png', 'bb197402-8509-49e5-84ca-ac6077f8a732.png', NULL, NULL, 194594, NULL, 1, '2024-05-11 08:32:02', NULL, NULL, NULL),
	(47, NULL, 'han1.png', 'de6bc1ba-6013-4172-b71f-0d275584eabe.png', NULL, NULL, 1032516, NULL, 1, '2024-05-11 08:32:02', NULL, NULL, NULL),
	(48, NULL, 'han1.png', 'ca77b081-14a5-4c39-a8e6-15ef8a60869b.png', NULL, NULL, 1032516, NULL, 1, '2024-05-11 08:35:06', NULL, NULL, NULL),
	(49, NULL, 'han2.png', '2746081f-ed9e-4415-a5a7-f78140729c5a.png', NULL, NULL, 194594, NULL, 1, '2024-05-11 08:35:06', NULL, NULL, NULL),
	(50, NULL, 'Rectangle 47.png', '08cf09e0-00d3-4eb1-9c66-93cf2c4656a2.png', NULL, NULL, 123, NULL, 1, '2024-05-11 08:36:32', NULL, NULL, NULL),
	(51, NULL, 's2.png', '4ba0e5ac-0eec-4296-9427-9e550eef669a.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:36:32', NULL, NULL, NULL),
	(52, NULL, 'Rectangle 148.png', '28bcfed5-0ee2-4780-a86c-ccf33443a006.png', NULL, NULL, 304, NULL, 1, '2024-05-11 08:36:32', NULL, NULL, NULL),
	(53, NULL, 's1.png', 'c44d4204-3f43-4519-b519-76ca25d7909f.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:36:32', NULL, NULL, NULL),
	(54, NULL, 'nam1.png', 'adca0e80-feb4-499b-bf25-e9e285ca9ed1.png', NULL, NULL, 772857, NULL, 1, '2024-05-11 08:38:10', NULL, NULL, NULL),
	(55, NULL, 'nam2.png', 'a1687244-f15f-47c7-ae60-b067c723ad03.png', NULL, NULL, 210069, NULL, 1, '2024-05-11 08:38:10', NULL, NULL, NULL),
	(56, NULL, 'Rectangle 47.png', 'fa769a34-52eb-44b6-b45a-487db79a663d.png', NULL, NULL, 123, NULL, 1, '2024-05-11 08:39:53', NULL, NULL, NULL),
	(57, NULL, 's1.png', '38e3c5d0-284c-4eba-adc4-aa56d69c22e0.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:39:53', NULL, NULL, NULL),
	(58, NULL, 'Rectangle 148.png', '85b49975-0183-4ae6-8422-aea56ff66855.png', NULL, NULL, 304, NULL, 1, '2024-05-11 08:39:53', NULL, NULL, NULL),
	(59, NULL, 's2.png', 'dcbb0cbd-bd42-4b27-a3b3-0bea6128f515.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:39:53', NULL, NULL, NULL),
	(60, NULL, 'Rectangle 47.png', '09564036-fc3b-49c6-a530-eaadf71e4676.png', NULL, NULL, 123, NULL, 1, '2024-05-11 08:40:54', NULL, NULL, NULL),
	(61, NULL, 'Rectangle 148.png', 'b895c28c-0442-4363-838f-91f4a49d7962.png', NULL, NULL, 304, NULL, 1, '2024-05-11 08:40:54', NULL, NULL, NULL),
	(62, NULL, 's2.png', '7d79760c-a5de-448f-8dc4-72946a917ef4.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:40:54', NULL, NULL, NULL),
	(63, NULL, 's1.png', 'd632a433-0d11-4855-8ea6-a0424d9573fa.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:40:54', NULL, NULL, NULL),
	(64, NULL, 'han1.png', '39894452-ebab-44cc-bd0f-3916cbb20ab8.png', NULL, NULL, 1032516, NULL, 1, '2024-05-11 08:50:54', NULL, NULL, NULL),
	(65, NULL, 'Rectangle 47.png', 'd0811b15-6d2b-42a5-b554-151991a3d68e.png', NULL, NULL, 123, NULL, 1, '2024-05-11 08:51:05', NULL, NULL, NULL),
	(66, NULL, 'Rectangle 148.png', 'd0193cb6-00da-4551-9b48-e42c26a84b35.png', NULL, NULL, 304, NULL, 1, '2024-05-11 08:51:06', NULL, NULL, NULL),
	(67, NULL, 's1.png', '36fd4855-b41a-4ce7-9ed7-b1560d42e590.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:51:06', NULL, NULL, NULL),
	(68, NULL, 's2.png', 'a44b2872-8a1f-49f6-ae1e-63660a467fa0.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:51:06', NULL, NULL, NULL),
	(69, NULL, 'nam1.png', 'e916740d-ff53-4a46-b0c6-d25c06e480cb.png', NULL, NULL, 772857, NULL, 1, '2024-05-11 08:53:22', NULL, NULL, NULL),
	(70, NULL, 'Rectangle 47.png', '36d78420-c526-42e4-a1b0-e36f06d62e52.png', NULL, NULL, 123, NULL, 1, '2024-05-11 08:53:31', NULL, NULL, NULL),
	(71, NULL, 'Rectangle 148.png', '7bb956b4-eafb-42fe-bbdc-fdf7693aefd2.png', NULL, NULL, 304, NULL, 1, '2024-05-11 08:53:31', NULL, NULL, NULL),
	(72, NULL, 's1.png', '761e1bb7-a7f2-4be1-bf01-ec5286f68c54.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 08:53:31', NULL, NULL, NULL),
	(73, NULL, 's2.png', '62fde046-09c1-42d6-93a9-5d6d8ba80b90.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 08:53:31', NULL, NULL, NULL),
	(74, NULL, 'han2.png', '8ea5c4d2-915d-47d3-8aa0-35275f460790.png', NULL, NULL, 194594, NULL, 1, '2024-05-11 08:57:09', NULL, NULL, NULL),
	(75, NULL, 'dolphin-76.png', '0600b626-df7f-40e3-a0b8-7df61c08f775.png', NULL, NULL, 533532, NULL, 1, '2024-05-11 08:57:17', NULL, NULL, NULL),
	(76, NULL, 'Frame.png', 'a93ea214-c596-4857-ba45-cf141ac72e48.png', NULL, NULL, 1800, NULL, 1, '2024-05-11 08:57:17', NULL, NULL, NULL),
	(77, NULL, 'nam1.png', 'cb50d02e-71f2-47b9-a7ab-4992134bad64.png', NULL, NULL, 772857, NULL, 1, '2024-05-11 08:58:32', NULL, NULL, NULL),
	(78, NULL, 'nam2.png', 'a91b3353-f143-45c0-914c-d050bfac28c0.png', NULL, NULL, 210069, NULL, 1, '2024-05-11 08:58:32', NULL, NULL, NULL),
	(79, NULL, 'image_2024-05-09_22-48-16.png', '431c0459-fab4-4e97-bca7-69bc48381468.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 08:59:52', NULL, NULL, NULL),
	(80, NULL, 's1.png', 'b3bac2dc-1298-4c6f-90e9-5dd62a5d79a2.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 09:03:37', NULL, NULL, NULL),
	(81, NULL, 'Rectangle 47.png', '5b5b0b33-1a46-4131-9af5-c39bc0b915c3.png', NULL, NULL, 123, NULL, 1, '2024-05-11 09:03:44', NULL, NULL, NULL),
	(82, NULL, 'Rectangle 148.png', 'a60531ac-1806-4867-b70f-ae45a00060c7.png', NULL, NULL, 304, NULL, 1, '2024-05-11 09:03:44', NULL, NULL, NULL),
	(83, NULL, 's1.png', '6b832ff3-6762-4d72-b831-36005ebe0d20.png', NULL, NULL, 360480, NULL, 1, '2024-05-11 09:03:44', NULL, NULL, NULL),
	(84, NULL, 's2.png', 'bfc570fd-1041-4e17-815a-810603605ba7.png', NULL, NULL, 424047, NULL, 1, '2024-05-11 09:03:44', NULL, NULL, NULL),
	(85, NULL, 'nam2.png', '1de8d1b7-ac1b-444d-a102-993d42872010.png', NULL, NULL, 210069, NULL, 1, '2024-05-11 09:04:53', NULL, NULL, NULL),
	(86, 5, 'Rectangle 47.png', '8c090607-7d6b-4648-ba61-20442b23bdfc.png', 1, NULL, 123, NULL, 0, '2024-05-11 09:05:06', NULL, NULL, NULL),
	(87, 5, 'Rectangle 148.png', 'aeb8d844-8be6-4e4b-ba4c-34f74e934e9e.png', 1, NULL, 304, NULL, 0, '2024-05-11 09:05:06', NULL, NULL, NULL),
	(88, 5, 's2.png', 'adcf0833-20dd-4eae-9af8-89f2b2c65876.png', 1, NULL, 424047, NULL, 0, '2024-05-11 09:05:06', NULL, NULL, NULL),
	(89, 5, 's1.png', '9860cd4a-3d52-4a03-9242-4c2281f365b7.png', 1, NULL, 360480, NULL, 0, '2024-05-11 09:05:06', NULL, NULL, NULL),
	(90, NULL, 'dolphin-76.png', '210a9cb6-25e9-43ee-bd04-900e1fe90bba.png', NULL, NULL, 533532, NULL, 1, '2024-05-11 09:44:26', NULL, NULL, NULL),
	(91, NULL, 'Frame.png', 'e8c1aa4a-76a1-4d0a-bec3-c5393d5913d7.png', NULL, NULL, 1800, NULL, 1, '2024-05-11 09:44:26', NULL, NULL, NULL),
	(92, NULL, 'Rectangle 47.png', 'd429fd10-2388-44a8-a20a-66478d7e06a9.png', NULL, NULL, 123, NULL, 1, '2024-05-11 09:44:46', NULL, NULL, NULL),
	(93, NULL, 'Rectangle 148.png', '650236c9-eef6-4cce-b8f8-e6274775b3f7.png', NULL, NULL, 304, NULL, 1, '2024-05-11 09:44:46', NULL, NULL, NULL),
	(94, NULL, 'han1.png', '956a8a02-b317-404a-8048-53d4d224ce9d.png', NULL, NULL, 1032516, NULL, 1, '2024-05-11 09:46:12', NULL, NULL, NULL),
	(95, NULL, '1_2.png', '1d00f14b-52b3-4c36-b370-2799a7c5a71d.png', NULL, NULL, 180075, NULL, 1, '2024-05-11 09:47:33', NULL, NULL, NULL),
	(96, NULL, '1_1.png', '13c1a9f1-68bd-4063-bd0b-f8d019386d11.png', NULL, NULL, 188666, NULL, 1, '2024-05-11 09:47:33', NULL, NULL, NULL),
	(97, NULL, '1_3.png', '7edb33c7-8dd4-49cd-bb9a-4a8e01acd6a9.png', NULL, NULL, 79027, NULL, 1, '2024-05-11 09:47:33', NULL, NULL, NULL),
	(98, NULL, 'image_2024-05-09_22-48-16.png', '4f04a24c-2960-4e34-a983-128c0cc722e4.png', NULL, NULL, 13730, NULL, 1, '2024-05-11 09:47:52', NULL, NULL, NULL),
	(99, NULL, 'nam1.png', '95cb3e0b-8895-473f-8f89-685d876c2b49.png', NULL, NULL, 772857, NULL, 1, '2024-05-16 17:01:48', NULL, NULL, NULL),
	(100, 2, 'nam1.png', '0948c3ae-86ad-4534-b027-f1cf50a5f964.png', 3, NULL, 772857, NULL, 0, '2024-05-16 17:01:54', NULL, NULL, NULL),
	(101, 2, 'ATINO.png', '3a0399b7-2564-44a7-b951-047b76cc7f63.png', 3, NULL, 13888, NULL, 0, '2024-05-16 17:01:54', NULL, NULL, NULL),
	(102, 3, 'dolphin-76.png', 'd0a0c426-10e8-445d-adbb-5ebaa033cc1c.png', 3, NULL, 533532, NULL, 0, '2024-05-16 17:02:28', NULL, NULL, NULL),
	(103, 4, 'image_2024-05-09_22-48-16.png', '7663a585-dcb5-4d2c-9265-59365f05a0af.png', 3, NULL, 13730, NULL, 0, '2024-05-16 17:04:32', NULL, NULL, NULL),
	(104, 5, 'Frame.png', 'af4fc707-cf83-48fe-8cf4-a9430f93d50a.png', 3, NULL, 1800, NULL, 0, '2024-05-16 17:05:36', NULL, NULL, NULL),
	(105, 6, 'u1.png', 'a6421868-2147-4cef-b315-54289f5a483d.png', 3, NULL, 260457, NULL, 0, '2024-05-16 17:06:29', NULL, NULL, NULL),
	(106, NULL, 'banner_1.jpg', 'a5e64a07-3ff6-4494-b439-4b9ac2473b46.jpg', NULL, NULL, 780626, NULL, 1, '2024-05-19 02:52:38', NULL, NULL, NULL),
	(107, NULL, 'banner_2.jpg', 'e8f581de-9398-4dda-b5b7-67cf721ca069.jpg', NULL, NULL, 944481, NULL, 1, '2024-05-19 02:52:44', NULL, NULL, NULL),
	(108, NULL, 'ao_1.jpg', '6e5c8e22-faf2-4551-a7e7-e0d58290a721.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 03:20:36', NULL, NULL, NULL),
	(109, NULL, 'ao_1.jpg', '5d284558-f675-4cd5-beb8-a7034325d497.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 03:22:40', NULL, NULL, NULL),
	(110, NULL, 'ao_1.jpg', 'e4c941a6-446e-4fc7-af60-aaf3efcb573c.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 03:23:00', NULL, NULL, NULL),
	(111, NULL, 'ao_2.jpg', '1bb32e89-ca67-4a08-a458-c741320ea226.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 03:24:06', NULL, NULL, NULL),
	(112, NULL, 'ao_1.jpg', '3ec7f74c-47bf-47fb-976e-0af911bdb398.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 08:29:31', NULL, NULL, NULL),
	(113, NULL, 'ao_2.jpg', '1f7be801-b589-439c-affc-c29c8650ee68.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 08:29:31', NULL, NULL, NULL),
	(114, NULL, 'ao_1.jpg', 'a292f31f-d2d8-4e1e-bb9f-9aa024760e4e.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 08:33:22', NULL, NULL, NULL),
	(115, NULL, 'ao_2.jpg', 'c39852c2-9d0f-4021-9c12-169f77ca9b0f.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 08:33:22', NULL, NULL, NULL),
	(116, NULL, 'ao_1.jpg', '067b6409-30a0-472c-b467-bcf1c0764066.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 08:35:24', NULL, NULL, NULL),
	(117, NULL, 'ao_2.jpg', '4338d4e3-a02d-46a1-a539-86511934a4b8.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 08:35:24', NULL, NULL, NULL),
	(118, NULL, 'ao_1.jpg', '689ab76c-c633-4351-b9b1-ff39df812dfe.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 08:36:45', NULL, NULL, NULL),
	(119, NULL, 'ao_2.jpg', '78f4821c-6a36-47d7-ae45-82436ac74b01.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 08:36:45', NULL, NULL, NULL),
	(120, NULL, 'ao_1.jpg', '73764f4c-0393-4473-8ed0-24bbccf47b5c.jpg', NULL, NULL, 198532, NULL, 1, '2024-05-19 08:39:16', NULL, NULL, NULL),
	(121, NULL, 'ao_2.jpg', 'd5676a45-5ec2-475e-a78f-6a93453649ed.jpg', NULL, NULL, 303102, NULL, 1, '2024-05-19 08:39:16', NULL, NULL, NULL),
	(122, 7, 'ao_1.jpg', 'da8f1112-df3b-48ef-a6e1-32b9c7844e6a.jpg', 1, NULL, 198532, NULL, 0, '2024-05-19 08:44:13', NULL, NULL, NULL),
	(123, 7, 'ao_2.jpg', '67edbc8f-66dc-4f0e-a3d2-a5e1a7d1c80d.jpg', 1, NULL, 303102, NULL, 0, '2024-05-19 08:44:13', NULL, NULL, NULL),
	(124, NULL, 'Screenshot 2024-05-20 184544.png', '6514b9f1-efd7-4d79-b3b8-75f6945acdcc.png', NULL, NULL, 312941, NULL, 1, '2024-05-20 11:46:01', NULL, NULL, NULL),
	(125, NULL, 'somitrang1.png', '4ab393b4-b4d1-4690-806d-ed1febeb4a1c.png', NULL, NULL, 133794, NULL, 1, '2024-05-27 04:16:19', NULL, NULL, NULL),
	(126, 8, 'somitrang1.png', '458a79db-fbcb-4217-9646-e60c51376580.png', 1, NULL, 133794, NULL, 0, '2024-05-27 04:19:45', NULL, NULL, NULL),
	(127, 8, 'somitrang2.png', 'dac86775-5527-42b9-842b-83c6189f942a.png', 1, NULL, 245468, NULL, 0, '2024-05-27 04:19:45', NULL, NULL, NULL),
	(128, 8, 'somitrang3.png', '9a8e4399-b235-4507-9130-7cff8226f6c5.png', 1, NULL, 235952, NULL, 0, '2024-05-27 04:19:45', NULL, NULL, NULL),
	(129, 8, 'somitrang4.png', 'a893c1af-8227-4300-841e-4ea77ec01adc.png', 1, NULL, 447056, NULL, 0, '2024-05-27 04:19:45', NULL, NULL, NULL),
	(130, NULL, 'trangxanh1.png', 'f8380b8c-3c14-421e-be4f-33e9f358c792.png', NULL, NULL, 335235, NULL, 1, '2024-05-27 04:24:26', NULL, NULL, NULL),
	(131, NULL, 'trangxanh1.png', 'ad32a4cc-9c14-4aee-b64d-26c18c0ae127.png', NULL, NULL, 335235, NULL, 1, '2024-05-27 04:24:31', NULL, NULL, NULL),
	(132, NULL, 'trangxanh2.png', '1026f766-2ed0-4f8d-9077-a4bd45b0aeae.png', NULL, NULL, 318951, NULL, 1, '2024-05-27 04:24:31', NULL, NULL, NULL),
	(133, NULL, 'trangxanh3.png', 'b73f7985-c110-4cf1-9fef-ce03d717eb1f.png', NULL, NULL, 147564, NULL, 1, '2024-05-27 04:24:31', NULL, NULL, NULL),
	(134, NULL, 'trangxanh4.png', '88926b95-a69e-471b-882a-f6555f2282eb.png', NULL, NULL, 784936, NULL, 1, '2024-05-27 04:24:31', NULL, NULL, NULL),
	(135, 9, 'trangxanh1.png', '2e56fc67-c8e2-4a8d-b790-1d4ff2381e20.png', 1, NULL, 335235, NULL, 0, '2024-05-27 04:26:54', NULL, NULL, NULL),
	(136, 9, 'trangxanh2.png', '9a0f7b3f-e788-4bc1-a570-649a1516b3bb.png', 1, NULL, 318951, NULL, 0, '2024-05-27 04:26:54', NULL, NULL, NULL),
	(137, 9, 'trangxanh3.png', 'c10c5f5a-5c08-4470-ba8c-4366d52a0779.png', 1, NULL, 147564, NULL, 0, '2024-05-27 04:26:54', NULL, NULL, NULL),
	(138, 9, 'trangxanh4.png', 'ba8e807f-26b2-465a-a374-115d48420fe2.png', 1, NULL, 784936, NULL, 0, '2024-05-27 04:26:54', NULL, NULL, NULL),
	(139, NULL, 'densolid2.png', '7af58d92-8452-4d4c-94f5-2059abe2b691.png', NULL, NULL, 270954, NULL, 1, '2024-05-27 04:29:50', NULL, NULL, NULL),
	(140, NULL, 'densolid1.png', '5bc1e1c0-5d9c-47d3-83bf-5b6c828757d0.png', NULL, NULL, 135819, NULL, 1, '2024-05-27 04:30:00', NULL, NULL, NULL),
	(141, NULL, 'densolid2.png', '7fb463eb-f89d-4961-a00d-5a0ca9978998.png', NULL, NULL, 270954, NULL, 1, '2024-05-27 04:30:00', NULL, NULL, NULL),
	(142, NULL, 'densolid3.png', 'cb24e217-cee2-4903-9e60-b3dcc3e5a5f1.png', NULL, NULL, 247559, NULL, 1, '2024-05-27 04:30:00', NULL, NULL, NULL),
	(143, 10, 'densolid1.png', '982e9a60-eca6-4842-bf33-6367567cc583.png', 1, NULL, 135819, NULL, 0, '2024-05-27 04:31:27', NULL, NULL, NULL),
	(144, 10, 'densolid2.png', '4175254f-fda8-49df-ae80-41e51220fa80.png', 1, NULL, 270954, NULL, 0, '2024-05-27 04:31:27', NULL, NULL, NULL),
	(145, 10, 'densolid3.png', 'd66e5d73-84c9-4cd1-a1e9-469f5f81eb86.png', 1, NULL, 247559, NULL, 0, '2024-05-27 04:31:27', NULL, NULL, NULL),
	(146, NULL, 'xaminhoatiet1.png', '0a078bc3-182e-4c6b-9140-a9ff60ba9105.png', NULL, NULL, 324207, NULL, 1, '2024-05-27 04:34:48', NULL, NULL, NULL),
	(147, 11, 'xaminhoatiet.png', '49237eb7-e828-4ec4-bf26-07329f0b3155.png', 1, NULL, 162045, NULL, 0, '2024-05-27 04:34:58', NULL, NULL, NULL),
	(148, 11, 'xaminhoatiet1.png', 'b18cf50f-b730-448f-89db-2c67eb63e73e.png', 1, NULL, 324207, NULL, 0, '2024-05-27 04:34:58', NULL, NULL, NULL),
	(149, 11, 'xaminhoatiet2.png', '19691cfb-e719-4ffe-a671-a379e245c685.png', 1, NULL, 358299, NULL, 0, '2024-05-27 04:34:58', NULL, NULL, NULL),
	(150, 11, 'xaminhoatiet3.png', 'ab648042-5a6c-4b3f-945d-d864cb59dbca.png', 1, NULL, 836619, NULL, 0, '2024-05-27 04:34:58', NULL, NULL, NULL),
	(151, NULL, 'xanhtinthanke1.png', 'b82093c1-a9bd-439a-8064-95e395db6ff6.png', NULL, NULL, 369695, NULL, 1, '2024-05-27 04:39:42', NULL, NULL, NULL),
	(152, 12, 'xanhtinthanke1.png', '35d33493-c5d1-4c28-aea7-346fcac24019.png', 1, NULL, 369695, NULL, 0, '2024-05-27 04:39:47', NULL, NULL, NULL),
	(153, 12, 'xanhtinthanke2.png', '88b0ba43-7bdb-41e5-b90e-2e437d026a64.png', 1, NULL, 341679, NULL, 0, '2024-05-27 04:39:47', NULL, NULL, NULL),
	(154, 12, 'xanhtinthanke3.png', '59b28b06-1f84-4081-9eab-ac3ff372ab0e.png', 1, NULL, 198318, NULL, 0, '2024-05-27 04:39:47', NULL, NULL, NULL),
	(155, NULL, 'denketrang1.png', 'd42ecbec-c84b-47ac-9de2-d21328fcbfa4.png', NULL, NULL, 339371, NULL, 1, '2024-05-27 04:43:56', NULL, NULL, NULL),
	(156, 13, 'denketrang1.png', '63ef66c9-a09c-47b1-904c-66cf9be093bd.png', 1, NULL, 339371, NULL, 0, '2024-05-27 04:44:03', NULL, NULL, NULL),
	(157, 13, 'denketrang2.png', '9ae03d9f-5849-4467-b3fb-147989f41cb2.png', 1, NULL, 350017, NULL, 0, '2024-05-27 04:44:03', NULL, NULL, NULL),
	(158, 13, 'denketrang3.png', 'b4172ded-fe07-4673-8785-1c70484e1fe1.png', 1, NULL, 188749, NULL, 0, '2024-05-27 04:44:03', NULL, NULL, NULL),
	(159, NULL, 'trangkedo1.png', '4f25e79a-15a9-4e50-a637-8aa1a2386837.png', NULL, NULL, 301142, NULL, 1, '2024-05-27 04:47:24', NULL, NULL, NULL),
	(160, 14, 'trangkedo1.png', '1e7f1628-11de-40f7-9dc3-669675e9c80a.png', 1, NULL, 301142, NULL, 0, '2024-05-27 04:47:33', NULL, NULL, NULL),
	(161, 14, 'trangkedo2.png', '001e1bc9-2a77-4f26-940d-825af6ddcce7.png', 1, NULL, 331392, NULL, 0, '2024-05-27 04:47:33', NULL, NULL, NULL),
	(162, 14, 'trangkedo3.png', '051d52a7-1cdf-4b3a-a4cb-e1dd083aff93.png', 1, NULL, 167507, NULL, 0, '2024-05-27 04:47:33', NULL, NULL, NULL),
	(163, NULL, 'xanhtim1.png', '08aac867-ff1f-4dd5-b276-38d16b291588.png', NULL, NULL, 159810, NULL, 1, '2024-05-27 04:50:51', NULL, NULL, NULL),
	(164, 15, 'xanhtim1.png', '7649cd30-64c6-4c02-b42f-cf90ee4a2ad0.png', 1, NULL, 159810, NULL, 0, '2024-05-27 04:51:00', NULL, NULL, NULL),
	(165, 15, 'xanhtim2.png', '3c03c140-3e38-45cf-bea3-6413c0af7ad0.png', 1, NULL, 285135, NULL, 0, '2024-05-27 04:51:00', NULL, NULL, NULL),
	(166, 15, 'xanhtim3.png', '24ad2f7e-e2eb-4ad3-b61e-97c4144c8b13.png', 1, NULL, 173519, NULL, 0, '2024-05-27 04:51:00', NULL, NULL, NULL),
	(167, 15, 'xanhtim4.png', '8d21efcf-ab88-42a4-a873-de97ab543679.png', 1, NULL, 337027, NULL, 0, '2024-05-27 04:51:00', NULL, NULL, NULL),
	(168, NULL, 'cam1.png', '86c600e4-5556-49aa-bb2c-0dd7421f6af6.png', NULL, NULL, 186563, NULL, 1, '2024-05-27 04:53:12', NULL, NULL, NULL),
	(169, 16, 'cam1.png', 'c09f7357-7b67-4918-ac05-746b2d6aeaef.png', 1, NULL, 186563, NULL, 0, '2024-05-27 04:53:19', NULL, NULL, NULL),
	(170, 16, 'cam2.png', '34bdf8ec-c37a-4dac-8ee6-e0c8cc9d04a0.png', 1, NULL, 343774, NULL, 0, '2024-05-27 04:53:19', NULL, NULL, NULL),
	(171, 16, 'cam3.png', '024a06f6-f03d-41d1-9723-d4b600c52ebd.png', 1, NULL, 334687, NULL, 0, '2024-05-27 04:53:19', NULL, NULL, NULL),
	(172, NULL, 'xanhtimthan1.jpg', '13773a9c-dbe2-4791-87c1-78c4b65a2b1c.jpg', NULL, NULL, 272735, NULL, 1, '2024-05-27 04:55:29', NULL, NULL, NULL),
	(173, NULL, 'xanhtimthan2.jpg', '698363a4-f6e1-4766-8a44-c3a27c7fe0db.jpg', NULL, NULL, 294670, NULL, 1, '2024-05-27 04:55:29', NULL, NULL, NULL),
	(174, NULL, 'xanhtimthan3.jpg', '479b0298-7634-4f5d-99c5-9b2d004121b4.jpg', NULL, NULL, 143624, NULL, 1, '2024-05-27 04:55:29', NULL, NULL, NULL),
	(175, NULL, 'xanhtimthan1.jpg', '45d38c92-d01f-4f75-ac2b-833572307115.jpg', NULL, NULL, 272735, NULL, 1, '2024-05-27 04:56:48', NULL, NULL, NULL),
	(176, 17, 'xanhtimthan1.jpg', '0f481487-ca84-4711-b5fd-a885d28b0d29.jpg', 1, NULL, 272735, NULL, 0, '2024-05-27 04:56:55', NULL, NULL, NULL),
	(177, 17, 'xanhtimthan2.jpg', '345c5619-452d-4d56-8293-596619787b24.jpg', 1, NULL, 294670, NULL, 0, '2024-05-27 04:56:55', NULL, NULL, NULL),
	(178, 17, 'xanhtimthan3.jpg', 'c175bd2d-a2cb-4987-9069-1a203f8ed2c1.jpg', 1, NULL, 143624, NULL, 0, '2024-05-27 04:56:55', NULL, NULL, NULL),
	(179, NULL, 'xanhbien2231.png', '995cbe63-a5b7-436d-8e6a-d6c1bd755b63.png', NULL, NULL, 227905, NULL, 1, '2024-05-27 05:10:09', NULL, NULL, NULL),
	(180, NULL, 'xanhbien2231.png', '33f378c7-763d-4cd5-b626-8a8f60981a43.png', NULL, NULL, 227905, NULL, 1, '2024-05-27 05:10:39', NULL, NULL, NULL),
	(181, NULL, 'xanhbien2232.png', 'a825f5f1-bafb-410b-886e-687d12735e76.png', NULL, NULL, 271176, NULL, 1, '2024-05-27 05:10:39', NULL, NULL, NULL),
	(182, NULL, 'xanhbien2233.png', '53c235fb-0280-4483-95ba-41ac464bbc99.png', NULL, NULL, 131808, NULL, 1, '2024-05-27 05:10:39', NULL, NULL, NULL),
	(183, NULL, 'xanhbien2231.png', '0f0fb94b-ce30-45ca-a29f-bca3ec82a719.png', NULL, NULL, 227905, NULL, 1, '2024-05-27 05:12:12', NULL, NULL, NULL),
	(184, 19, 'xanhbien2231.png', '61b31245-b63c-4f97-8492-03ef8df2a741.png', 1, NULL, 227905, NULL, 0, '2024-05-27 05:12:21', NULL, NULL, NULL),
	(185, 19, 'xanhbien2232.png', '942cc71b-ec0b-4752-8ce4-8cadbf3a3a4f.png', 1, NULL, 271176, NULL, 0, '2024-05-27 05:12:21', NULL, NULL, NULL),
	(186, 19, 'xanhbien2233.png', '7cee7e06-7617-4c17-b1fc-5f5bfd2f4e4d.png', 1, NULL, 131808, NULL, 0, '2024-05-27 05:12:21', NULL, NULL, NULL),
	(187, NULL, 'do1.png', '87f3c181-8420-44ea-abfd-dfeca72fe3a4.png', NULL, NULL, 272336, NULL, 1, '2024-05-27 05:15:55', NULL, NULL, NULL),
	(188, 20, 'do1.png', '93dcda87-6ce4-48f7-adf2-77c0d2ae37cb.png', 1, NULL, 272336, NULL, 0, '2024-05-27 05:16:04', NULL, NULL, NULL),
	(189, 20, 'do2.png', '473120fd-14b0-447d-9e11-d905f01a34b9.png', 1, NULL, 299514, NULL, 0, '2024-05-27 05:16:04', NULL, NULL, NULL),
	(190, 20, 'do3.png', '9a1d5ccf-49a9-4f7e-a47e-572ce483b6a2.png', 1, NULL, 154090, NULL, 0, '2024-05-27 05:16:04', NULL, NULL, NULL),
	(191, NULL, 'den211.png', 'ed34afc6-c89d-4098-b5f9-6daa01c695a5.png', NULL, NULL, 206683, NULL, 1, '2024-05-27 05:19:41', NULL, NULL, NULL),
	(192, 21, 'den211.png', 'ae819b0c-68bb-4090-8ffd-eb4d33a1787d.png', 1, NULL, 206683, NULL, 0, '2024-05-27 05:19:49', NULL, NULL, NULL),
	(193, 21, 'den212.png', '605ac782-9707-4a2f-90b5-6f02b98be0fb.png', 1, NULL, 204024, NULL, 0, '2024-05-27 05:19:49', NULL, NULL, NULL),
	(194, 21, 'den213.png', '3d589354-244b-44a2-a492-6ac81424f995.png', 1, NULL, 159518, NULL, 0, '2024-05-27 05:19:49', NULL, NULL, NULL),
	(195, NULL, 'xam551.png', '09f51ceb-84c6-4a06-9216-69ac97b1143b.png', NULL, NULL, 267442, NULL, 1, '2024-05-27 05:21:57', NULL, NULL, NULL),
	(196, 22, 'xam551.png', '72d5cd50-2bbb-4404-be60-00aab307ce98.png', 1, NULL, 267442, NULL, 0, '2024-05-27 05:22:09', NULL, NULL, NULL),
	(197, 22, 'xam552.png', '6b45612b-4d98-4b2b-945d-9aa1d67670e8.png', 1, NULL, 242396, NULL, 0, '2024-05-27 05:22:09', NULL, NULL, NULL),
	(198, 22, 'xam553.png', 'e70be104-d5fd-481d-8575-5ba9bed332f2.png', 1, NULL, 188418, NULL, 0, '2024-05-27 05:22:09', NULL, NULL, NULL),
	(199, NULL, 'xam371.png', 'f3cb8b06-314c-4533-9519-0c06bbbdd0f8.png', NULL, NULL, 194294, NULL, 1, '2024-05-27 05:24:18', NULL, NULL, NULL),
	(200, 23, 'xam371.png', '2bf1eba0-82d5-4c58-9f3c-f6ae03e78d00.png', 1, NULL, 194294, NULL, 0, '2024-05-27 05:24:27', NULL, NULL, NULL),
	(201, 23, 'xam372.png', 'eeace64c-d004-43c3-a8a2-70a7031e1d67.png', 1, NULL, 199751, NULL, 0, '2024-05-27 05:24:27', NULL, NULL, NULL),
	(202, 23, 'xam373.png', '017a4f90-5782-4c54-9e12-dd085d7fb2ae.png', 1, NULL, 196170, NULL, 0, '2024-05-27 05:24:27', NULL, NULL, NULL),
	(203, NULL, 'xanhcovit91.png', '47b4030a-fa95-400b-ace0-ba2fe9849eed.png', NULL, NULL, 474113, NULL, 1, '2024-05-27 05:32:59', NULL, NULL, NULL),
	(204, 24, 'xanhcovit91.png', '73cc050b-9485-4feb-90da-6e2894cd5cb9.png', 1, NULL, 474113, NULL, 0, '2024-05-27 05:33:18', NULL, NULL, NULL),
	(205, 24, 'xanhcovit92.png', '8f9c3c28-78f6-4e2c-934f-199aa58bb96d.png', 1, NULL, 453457, NULL, 0, '2024-05-27 05:33:18', NULL, NULL, NULL),
	(206, 7, 'bst1.png', '0beaed54-c5e3-49d2-ba36-3cc946699205.png', 3, NULL, 922885, NULL, 0, '2024-05-27 05:39:53', NULL, NULL, NULL),
	(207, 7, 'bst1_1.png', 'b469150d-025b-44aa-83b6-425cd4d5ac31.png', 3, NULL, 717977, NULL, 0, '2024-05-27 05:39:53', NULL, NULL, NULL),
	(208, 8, 'bst2_1.png', '8db4d455-7b6f-4059-9455-10fe1e6a5326.png', 3, NULL, 780626, NULL, 0, '2024-05-27 05:55:48', NULL, NULL, NULL),
	(209, 8, 'bst2_2.png', '6fb89444-6e7f-4626-a6db-8b0193b5d174.png', 3, NULL, 1534510, NULL, 0, '2024-05-27 05:55:49', NULL, NULL, NULL),
	(210, NULL, 'tt1.jpg', '910c405b-3f7c-4859-a5b6-37833530142e.jpg', NULL, NULL, 1006167, NULL, 1, '2024-05-27 05:59:32', NULL, NULL, NULL),
	(211, NULL, 'tt2.jpg', '6e2cfa71-31d9-4e26-9b25-d7e4ce8a5fc4.jpg', NULL, NULL, 2133201, NULL, 1, '2024-05-27 06:21:22', NULL, NULL, NULL),
	(212, 9, 'bst3.png', '7c04a5c8-b8cb-435d-92ca-f1bbbe17397e.png', 3, NULL, 759031, NULL, 0, '2024-05-27 06:26:28', NULL, NULL, NULL),
	(213, 9, 'bst3_1png.png', '65c2482e-bf1b-487a-bb88-81ee76a467c8.png', 3, NULL, 1128023, NULL, 0, '2024-05-27 06:26:28', NULL, NULL, NULL),
	(214, NULL, 'bst4_2.png', '5f2b5a9b-0bca-45ea-a51c-78706379e6b1.png', NULL, NULL, 6125425, NULL, 1, '2024-05-27 06:29:33', NULL, NULL, NULL),
	(215, 10, 'bst4_1.png', 'e4fdff4c-2890-4f5b-9d36-af11914f70a1.png', 3, NULL, 4703596, NULL, 0, '2024-05-27 06:33:10', NULL, NULL, NULL),
	(216, 10, 'bst4_2.png', '0dd79618-de53-4730-822f-eb7a5b7ee84c.png', 3, NULL, 6125425, NULL, 0, '2024-05-27 06:33:10', NULL, NULL, NULL);

-- Dumping structure for table mai_aura.message
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` text,
  `sent_time` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.message: ~0 rows (approximately)

-- Dumping structure for table mai_aura.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `brief_description` varchar(1024) DEFAULT NULL,
  `content` longtext,
  `is_visible` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.news: ~4 rows (approximately)
INSERT INTO `news` (`id`, `title`, `avatar`, `author`, `brief_description`, `content`, `is_visible`, `is_active`, `updated_at`, `updated_by`, `created_at`, `created_by`) VALUES
	(1, 'Tin tức chuẩn', '46b6bf74-5072-406e-938c-9d5738d7cde6.png', 'H1', NULL, '<p>H0nsnjq</p>', 1, 0, '2024-05-11 04:50:09', NULL, '2024-05-11 04:50:09', 'admin'),
	(2, 'Tiêu đề 3', 'd7ce265a-f4f5-4b0f-bbfd-08022e4b6ea4.png', 'H3', '111', '<p>ABC123</p>', 1, 0, '2024-05-19 08:07:28', NULL, '2024-05-11 06:37:05', 'admin'),
	(3, 'XUÂN HÈ 2024 - ÁNH DƯƠNG | PHONG CÁCH PHÓNG KHOÁNG THANH NHÃ', '6514b9f1-efd7-4d79-b3b8-75f6945acdcc.png', 'Nguyễn Thanh', 'Đã 4 cái Tết xa nhà, anh Chử Văn Oanh vẫn "chưa quen" được với cảm giác nhớ mong gia đình, đặc biệt trong những dịp Xuân về.', '<p>Đã 4 cái Tết xa nhà, anh Chử Văn Oanh vẫn "chưa quen" được với cảm giác nhớ mong gia đình, đặc biệt trong những dịp Xuân về.</p><p><img src="https://aristino.com/Data/upload/images/b1388be3142db973e03c.jpg" alt="" width="1200" height="900"></p><p>Đã 4 cái Tết xa nhà, anh Chử Văn Oanh, Giám đốc chi nhánh Công ty Viettel Cambodia (thuộc Tổng công ty CP Đầu tư Quốc tế Viettel - Viettel Global) vẫn "chưa quen" được với cảm giác nhớ mong gia đình, đặc biệt trong những dịp Xuân về.</p><p>Nhiều năm công tác tại thị trường nước ngoài, với những nét đặc trưng văn hóa rất khác với Việt Nam, anh Oanh không còn xa lạ với cảnh một mình đón Tết. Mang trên mình trọng trách điều hành và phát triển chi nhánh công ty tại những thị trường mới, anh Oanh phải chấp nhận xa những cái Tết ấm êm, quây quần bên gia đình, bên mâm cơm tất niên rộn ràng tiếng cười để phát triển sự nghiệp chung.</p><p>Mỗi cái Tết xa nhà lại mang một cảm giác rất khác. Có nhớ nhung, có hoài nhiệm, cũng có mong mỏi, xót xa. Nhưng trên tất cả, vì công việc chung, vì sự thịnh vượng và đem thương hiệu Việt vươn tầm quốc tế, anh Oanh chấp nhận đánh đổi. Nếu như mọi năm, cái Tết với anh Oanh chỉ là những cuộc gọi điện vội vã, những lời chúc xa xôi, thì năm nay, anh Oanh đón một cái Tết mới, ý nghĩa hơn, trọn vẹn hơn nhiều.</p><p>Không quá cầu kỳ, một món quà từ Aristino với những lời nhắn gửi ý nghĩa giúp đem lại một cái Tết yêu thương, trọn vẹn sum vầy cùng những người xa quê!</p>', 1, 1, '2024-05-20 11:46:31', NULL, '2024-05-20 11:46:31', 'admin'),
	(4, 'BẢN SẮC DOANH NHÂN', '910c405b-3f7c-4859-a5b6-37833530142e.jpg', 'Đại Trịnh', 'Bản Sắc Doanh Nhân của Aristino không chỉ là một bộ sưu tập thời trang, mà còn là biểu tượng của sự đa dạng và linh hoạt.', '<p>Đăng bởi Nguyễn Huyền</p><p>Ngày 21/03/2024</p><p>Bản Sắc Doanh Nhân của Aristino không chỉ là một bộ sưu tập thời trang, mà còn là biểu tượng của sự đa dạng và linh hoạt.</p><p><img src="https://aristino.com/Data/upload/images/DSC05329.jpg" alt="" width="9504" height="6336"></p><p>BST "Bản&nbsp;Sắc&nbsp;Doanh Nhân"&nbsp;mang dấu ấn của hiện đại và phong cách, tô điểm thêm cho nét lịch lãm của mỗi quý ông. Với sự chỉn chu và thanh lịch vốn có, hòa quyện cùng chút phóng khoáng, tự do, BST&nbsp;là những thiết kế độc đáo, được Aristino tâm huyết dành cho quý ông thành đạt.</p><p><img src="https://aristino.com/Data/upload/images/DSC04932.jpg" alt="" width="9504" height="6336"></p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC05485.jpg" alt="" width="9504" height="6336"></p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC05680.jpg" alt="" width="9504" height="6336"></p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC05784.jpg" alt="" width="9504" height="6336"></p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC05911.jpg" alt="" width="9504" height="6336"></p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC06093.jpg" alt="" width="9504" height="6336"></p><p>Được thiết kế để phản ánh phong cách cá nhân và bản sắc của doanh nhân hiện đại, mỗi ngày đồng hành Aristino hứa hẹn sẽ là những trải nghiệm thú vị và đầy ý nghĩa.</p>', 1, 1, '2024-05-27 06:00:02', NULL, '2024-05-27 06:00:02', 'admin'),
	(5, 'XUÂN HÈ 2024 - ÁNH DƯƠNG | PHONG CÁCH PHÓNG KHOÁNG THANH NHÃ', '6e2cfa71-31d9-4e26-9b25-d7e4ce8a5fc4.jpg', 'Nguyễn Thanh', 'Mùa hè với những làn gió biển và ánh dương chan hòa mời gọi Quý ông đón nhận sự phóng khoáng trong trang phục nhưng không hề kém phần tao nhã.', '<p>Mùa hè với những làn gió biển và ánh dương chan hòa mời gọi Quý ông đón nhận sự phóng khoáng trong trang phục nhưng không hề kém phần tao nhã.</p><p>Phong cách Phóng khoáng Thanh nhã cho phép quý ông bước ra khỏi những trang phục quá trang trọng, hướng tới sự mới mẻ để tận hưởng mùa hè. Trọng tâm của những bộ trang phục thường ngày đầy thanh lịch là nghệ thuật cân bằng giữa sự thoải mái và nét chỉn chu, được thể hiện qua màu sắc trung tính pha với ánh cam, đỏ nâu của năng lượng, chất liệu vải thô mộc mà vẫn mềm mại cùng phom dáng khoáng đạt, giúp quý ông toát lên sự tự tin trong khi vẫn mát mẻ dưới ánh nắng mặt trời.</p><p>&nbsp;</p><p><img src="https://aristino.com/Data/upload/images/DSC00080.jpg" alt="" width="6336" height="9504"></p><p><img src="https://aristino.com/Data/upload/images/DSC00220.jpg" alt="" width="6336" height="9504"></p><p><img src="https://aristino.com/Data/upload/images/DSC00366.jpg" alt="" width="6336" height="9504"></p><p><img src="https://aristino.com/Data/upload/images/DSC00447.jpg" alt="" width="6178" height="9267"></p><p><img src="https://aristino.com/Data/upload/images/DSC00576.jpg" alt="" width="6336" height="9504"></p><p><img src="https://aristino.com/Data/upload/images/DSC00845.jpg" alt="" width="6336" height="9504"></p>', 1, 1, '2024-05-27 06:21:51', NULL, '2024-05-27 06:21:51', 'admin');

-- Dumping structure for table mai_aura.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `router_link` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.notification: ~12 rows (approximately)
INSERT INTO `notification` (`id`, `title`, `content`, `is_read`, `username`, `router_link`, `created_at`) VALUES
	(1, 'Tiêu đề 1', 'Nội dung 1', 0, 'dattt', NULL, '2024-05-26 23:04:41'),
	(2, 'Thông báo đặt hàng', 'Đơn hàng có mã HD010 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/13', '2024-05-27 08:06:25'),
	(3, 'Thông báo đặt hàng', 'Đơn hàng có mã HD011 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/14', '2024-05-27 08:10:45'),
	(4, 'Thông báo đặt hàng', 'Đơn hàng có mã HD012 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/15', NULL),
	(5, 'Thông báo đặt hàng', 'Đơn hàng có mã HD013 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/16', NULL),
	(6, 'Thông báo đặt hàng', 'Đơn hàng có mã HD014 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/17', '2024-05-27 01:30:10'),
	(7, 'Thông báo đặt hàng', 'Đơn hàng có mã HD015 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/18', '2024-05-27 08:04:49'),
	(8, 'Thông báo đặt hàng', 'Đơn hàng có mã HD016 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/19', '2024-05-27 08:09:11'),
	(9, 'Thông báo đặt hàng', 'Đơn hàng có mã HD017 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/20', '2024-05-27 08:10:08'),
	(10, 'Thông báo đặt hàng', 'Đơn hàng có mã HD018 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/21', '2024-05-27 08:13:37'),
	(11, 'Thông báo đặt hàng', 'Đơn hàng có mã HD019 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/22', '2024-05-27 08:14:38'),
	(12, 'Thông báo đặt hàng', 'Đơn hàng có mã HD020 vừa được đặt hàng. Vui lòng xác nhận đơn hàng!', 0, 'dattt', './admin/bill/detail/23', '2024-05-27 08:28:27');

-- Dumping structure for table mai_aura.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `description` text,
  `material` text,
  `price` decimal(20,4) DEFAULT NULL,
  `product_color` varchar(255) DEFAULT NULL,
  `product_form` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `sales` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_quantity_sales` int(11) DEFAULT NULL,
  `total_quantity_imported` int(11) DEFAULT NULL,
  `is_visible` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.product: ~21 rows (approximately)
INSERT INTO `product` (`id`, `category_id`, `product_name`, `avatar`, `description`, `material`, `price`, `product_color`, `product_form`, `size`, `sales`, `quantity`, `total_quantity_sales`, `total_quantity_imported`, `is_visible`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, NULL, '1', '4a07e7f4-091e-4768-853f-3b76c62d4da0.png', NULL, NULL, 1.0000, 'Đen kẻ trắng, ', NULL, 'M, ', NULL, NULL, NULL, NULL, NULL, 0, '2024-05-09 18:13:39', 'admin', '2024-05-09 18:13:39', NULL),
	(2, NULL, 'H1', '67e3b24a-70c6-4343-94cd-94e3bd3c54f2.png', '123', 'C1', 12000.0000, 'Trắng in họa tiết AR, Đen kẻ trắng, Trắng kẻ xanh, ', 'H1', 'M, S, L, ', 10, NULL, NULL, NULL, NULL, 0, '2024-05-10 03:09:39', 'admin', '2024-05-10 03:09:39', NULL),
	(3, NULL, 'H2', '85cd70ad-460a-471f-8120-b4cbab04b243.png', NULL, NULL, 1200.0000, 'Trắng in họa tiết AR, ', NULL, 'S, L, ', 10, NULL, NULL, NULL, NULL, 0, '2024-05-10 03:11:52', 'admin', '2024-05-10 03:11:52', NULL),
	(4, 8, 'Áo 2', 'de3c4fb0-88db-4871-8f89-81933e3a9173.png', NULL, NULL, 1200.0000, 'Trắng, Trắng in họa tiết AR, Đen kẻ trắng, ', NULL, 'M, L, ', 10, 9000, NULL, 148000, NULL, 0, '2024-05-10 03:29:13', 'admin', '2024-05-10 03:29:13', NULL),
	(5, 10, 'H012', '1de8d1b7-ac1b-444d-a102-993d42872010.png', NULL, NULL, 15000.0000, 'Đen kẻ trắng, Trắng kẻ xanh, ', NULL, 'S, M, ', 10, NULL, 0, NULL, NULL, 0, '2024-05-11 09:05:28', 'admin', '2024-05-11 09:05:28', NULL),
	(6, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS114AZ MÀU XANH TÍM THAN IN', 'e4c941a6-446e-4fc7-af60-aaf3efcb573c.jpg', NULL, NULL, 1200000.0000, 'Trắng in họa tiết AR, Trắng kẻ xanh, ', NULL, 'S, M, L, ', NULL, 120, 0, 120, NULL, 1, '2024-05-19 03:23:07', 'admin', '2024-05-19 03:23:07', NULL),
	(7, 10, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS029AZ MÀU BE KẺ DỆT DOBBY', '1bb32e89-ca67-4a08-a458-c741320ea226.jpg', NULL, NULL, 1500000.0000, 'Xanh biển in, Đen kẻ trắng, ', NULL, 'M, L, ', NULL, 100, 0, 100, NULL, 1, '2024-05-19 03:24:11', 'admin', '2024-05-19 03:24:11', NULL),
	(8, 8, 'ÁO SƠ MI NGẮN TAY ATINO ASS502AZ MÀU TRẮNG', '4ab393b4-b4d1-4690-806d-ed1febeb4a1c.png', NULL, NULL, 695000.0000, 'Trắng, ', NULL, 'M, L, XL, S, ', NULL, 90, 0, 90, NULL, 1, '2024-05-27 04:16:31', 'admin', '2024-05-27 04:16:31', NULL),
	(9, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS013AZ MÀU XÁM KẺ TRẮNG XANH', 'f8380b8c-3c14-421e-be4f-33e9f358c792.png', '- Áo sơ mi ngắn tay với phom dáng Regular fit suông nhẹ, thoải mái tối đa.\n- Áo thiết kế đơn giản, tà lượn, có túi ngực tiện lợi, họa tiết kẻ tinh tế, đem lại vẻ ngoài lịch lãm, tự tin cho các quý ông.', '- 50% Bamboo từ sợi tre thiên nhiên thấm hút tốt và tạo cảm giác mềm mại, thoáng khí. Ngoài ra chất liệu này có khả năng kháng khuẩn, triệt tiêu nấm mốc phát sinh trên áo, khử mùi hôi giúp phái mạnh luôn tự tin dù trong bất kỳ hoàn cảnh nào.\n- 50% Polyester giúp áo mỏng nhẹ, có độ trơn trượt, màu sắc nét và bền màu tốt theo thời gian.', 895000.0000, 'Trắng kẻ xanh, ', 'Dáng vừa/ Regular Fit', 'L, S, M, XL, ', NULL, 123, 0, 223, NULL, 1, '2024-05-27 04:24:33', 'admin', '2024-05-27 04:24:33', NULL),
	(10, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS151AZ MÀU ĐEN SOLID', '7af58d92-8452-4d4c-94f5-2059abe2b691.png', '- Áo sơ mi ngắn tay phom Perfect fit suông rộng mặc thả ngoài mà vẫn đảm bảo độ lịch sự chỉn chu cho người mặc.\n- Áo thiết kế với tà bằng, có túi ngực, màu đen tinh tế nam tính, mang đến vẻ ngoài lịch lãm và thời thượng.', '- 50% Bamboo từ sợi tre thiên nhiên mang đến sự thoáng mát, thấm hút tốt và tạo cảm giác thoải mái.\n- 50% Polyester giúp áo mỏng nhẹ, có độ trơn trượt, màu sắc nét và giữ màu tốt theo thời gian.', 795000.0000, 'Đen solid, ', 'Dáng mặc buông, vạt bằng/ Perfect fit', 'S, M, L, ', NULL, 234, 0, 234, NULL, 1, '2024-05-27 04:30:04', 'admin', '2024-05-27 04:30:04', NULL),
	(11, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS109AZ MÀU XÁM IN HỌA TIẾT', '0a078bc3-182e-4c6b-9140-a9ff60ba9105.png', NULL, NULL, 750000.0000, 'Xám in họa tiết, ', NULL, 'M, S, L, XL, ', NULL, 220, 0, 220, NULL, 1, '2024-05-27 04:35:01', 'admin', '2024-05-27 04:35:01', NULL),
	(12, 8, 'ÁO SƠ MI NGẮN TAY NAM ARISTINO ASS111S3 MÀU XANH TÍM THAN KẺ', 'b82093c1-a9bd-439a-8064-95e395db6ff6.png', '- Áo sơ mi ngắn tay phom Regular fit có độ suông rộng vừa đủ mà vẫn đảm bảo vừa vặn hình thể người mặc.\n- Áo được thiết kế với tà lượn, không có túi ngực cùng họa tiết xanh tím than kẻ nam tính, mang đến vẻ lịch lãm cho quý ông.\n', '- 50% Bamboo từ sợi tre thiên nhiên mang đến sự thoáng mát, thấm hút tốt và tạo cảm giác thoải mái.\n- 50% Polyester giúp áo bền màu, sắc nét và độ trơn trượt, mỏng nhẹ.', 800000.0000, 'Xanh tím than kẻ, ', 'Dáng vừa/ Regular Fit', 'S, M, L, ', NULL, 120, 0, 120, NULL, 1, '2024-05-27 04:39:50', 'admin', '2024-05-27 04:39:50', NULL),
	(13, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS012AZ MÀU ĐEN KẺ TRẮNG', 'd42ecbec-c84b-47ac-9de2-d21328fcbfa4.png', '- Áo sơ mi ngắn tay thiết kế phom Slim fit ôm vừa vặn cơ thể, tôn dáng người mặc.\n- Áo được thiết kế với tà lượn, không có túi ngực cùng họa tiết đen kẻ trắng bắt mắt, mang đến vẻ lịch lãm cho quý ông.', '- 41% Bamboo từ sợi tre thiên nhiên mang đến sự thoáng mát, thấm hút tốt và tạo cảm giác thoải mái.\n- 59% Polyester giúp áo bền màu, sắc nét và độ trơn trượt, mỏng nhẹ.', 650000.0000, 'Đen kẻ trắng, ', 'Dáng ôm / Slim fit', 'S, M, XL, L, ', NULL, 150, 0, 150, NULL, 1, '2024-05-27 04:44:08', 'admin', '2024-05-27 04:44:08', NULL),
	(14, 8, 'ÁO SƠ MI NGẮN TAY ARISTINO ASS121S3 MÀU TRẮNG KẺ ĐỎ', '4f25e79a-15a9-4e50-a637-8aa1a2386837.png', '- Áo sơ mi ngắn tay phom Perfect fit suông rộng mặc thả ngoài mà vẫn đảm bảo độ lịch sự chỉn chu cho người mặc.\n- Thiết kế basic với tà bằng thoải mái và túi ngực tiện lợi. Màu sắc nam tính, họa tiết in độc đáo, đem đến diện mạo thời thượng và lịch lãm cho người mặc.', '- 50% Bamboo từ sợi tre thiên nhiên mang đến sự thoáng mát, thấm hút tốt và tạo cảm giác thoải mái.\n- 50% Polyester giúp áo bền màu, sắc nét và độ trơn trượt, mỏng nhẹ.', 850000.0000, 'Trắng kẻ đỏ, ', 'Dáng mặc buông, vạt bằng/ Perfect fit', 'S, M, L, ', NULL, 130, 0, 130, NULL, 1, '2024-05-27 04:47:41', 'admin', '2024-05-27 04:47:41', NULL),
	(15, 10, 'ÁO THUN POLO CÓ CỔ NGẮN TAY ARISTINO APS097AZ', '08aac867-ff1f-4dd5-b276-38d16b291588.png', NULL, NULL, 595000.0000, 'Xanh tím than kẻ, Xanh tím than 45 mf, ', NULL, 'S, M, L, XL, ', NULL, 120, 0, 120, NULL, 1, '2024-05-27 04:51:02', 'admin', '2024-05-27 04:51:02', NULL),
	(16, 10, 'ÁO THUN POLO CÓ CỔ NGẮN TAY ARISTINO APS112AZ', '86c600e4-5556-49aa-bb2c-0dd7421f6af6.png', '- Áo Polo phom dáng Regular Fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.\n- Nằm trong BST Hoa Biển, được thiết kế với cổ dệt lịch sự kết hợp họa tiết Hoa Biển thời thượng giúp tôn dáng người mặc và dễ dàng phối hợp cùng trang phục khác.', '- 95% Cotton Organic thấm hút tốt, thoáng khí, thân thiện với làn da\n- 5% Spandex tạo độ co giãn nhẹ khi hoạt động', 695000.0000, 'Cam 102 in, ', 'Regular Fit', 'S, M, L, XL, ', NULL, 100, 0, 220, NULL, 1, '2024-05-27 04:53:22', 'admin', '2024-05-27 04:53:22', NULL),
	(17, 10, 'ÁO POLO NAM NGẮN TAY ATINO APS098AZ', '45d38c92-d01f-4f75-ac2b-833572307115.jpg', '- Áo Polo phom dáng Regular Fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.\n- Thiết kế basic với cổ tay áo bo rib kết hợp họa tiết kẻ ngang tinh tế giúp tôn dáng người mặc và dễ dàng phối hợp cùng trang phục khác', '- 30% Lotus giúp cung cấp ION Âm, cân bằng độ ẩm cho da, kháng tia UV hiệu quả, thoáng khí và khử mùi cơ thể. Ngoài ra còn giúp bề mặt vải mềm mại từ đó chống nhăn ưu việt.\n- 40% Modal từ sợi sồi thiên nhiên cho bề mặt vải mềm mại, nhẹ và thoáng khí\n- 25% Polyester giúp áo bền màu, sắc nét và độ trơn trượt, mỏng nhẹ\n- 5% Spandex tạo độ co giãn, thoải mái khi cử động', 750000.0000, 'Xanh tím than 41, ', 'Regular Fit', 'S, M, L, XL, ', NULL, 120, 0, 120, NULL, 1, '2024-05-27 04:57:01', 'admin', '2024-05-27 04:57:01', NULL),
	(19, 10, 'ÁO POLO NAM NGẮN TAY ARISTINO APS137S3 MÀU XANH BIỂN', '0f0fb94b-ce30-45ca-a29f-bca3ec82a719.png', '- Áo Polo phom dáng Slim fit ôm vừa vặn nhưng vẫn thoải mái trong mọi vận động, tôn dáng người mặc\n- Thiết kế basic với cổ dệt lịch sự, màu sắc nam tính và dễ dàng phối hợp với các trang phục khác.', '- 97% Cotton giúp áo mềm nhẹ, thấm hút tốt, thoáng khí dù ở mùa nào trong năm, đồng thời vẫn giữ được độ đứng dáng vừa đủ\n- 3% Spandex tạo độ co giãn cho áo', 700000.0000, 'Xanh biển 223, ', 'Slim fit', 'S, M, L, ', NULL, 100, 0, 100, NULL, 1, '2024-05-27 05:12:24', 'admin', '2024-05-27 05:12:24', NULL),
	(20, 10, 'ÁO POLO NAM NGẮN TAY ARISTINO APS085AZ', '87f3c181-8420-44ea-abfd-dfeca72fe3a4.png', '- Áo Polo phom dáng Regular Fit suông nhẹ, mang tới cảm giác thoải mái cho người mặc.\n- Thiết kế basic cùng màu sắc trẻ trung đem đến vẻ ngoài thời thượng, lịch lãm và sang trọng cho các quý ông.', '- 48% Cotton đem đến sự mềm mại, xốp nhẹ và thoáng khí.\n- 47% Polyester giúp áo mỏng nhẹ, bề mặt vải trơn bóng, màu sắc sắc nét và bền màu qua quá trình sử dụng.\n- 5% Spandex giữ độ co giãn tốt, tạo sự thoải mái.', 550000.0000, 'Đỏ 20, ', 'Dáng vừa/ Regular Fit', 'S, M, L, XL, ', NULL, 200, 0, 200, NULL, 1, '2024-05-27 05:16:23', 'admin', '2024-05-27 05:16:23', NULL),
	(21, 13, 'QUẦN ÂU ARISTINO ATR0060Z MÀU ĐEN 21 SOLID', 'ed34afc6-c89d-4098-b5f9-6daa01c695a5.png', '- Quần âu phom Regular fit suông nhẹ, phù hợp với nhiều dáng người\n- Màu sắc trung tính, dễ kết hợp trang phục khác, đường nét cắt may tinh tế, đơn giản nhưng vẫn đem lại diện mạo lịch lãm và nổi bật cho các quý ông.', '- 68% Polyester giúp quần bền màu, sắc nét, mặt vải trơn trượt, mỏng nhẹ.\n- 29% Rayon giúp quần có độ mềm mại, mát mẻ và bay rũ tự nhiên.\n- 3% Spandex tạo độ co giãn nhẹ.\n', 950000.0000, 'Đen 21, ', 'Dáng vừa/ Regular Fit', 'S, M, L, XL, ', NULL, 130, 0, 130, NULL, 1, '2024-05-27 05:19:52', 'admin', '2024-05-27 05:19:52', NULL),
	(22, 13, 'QUẦN ÂU NAM ARISTINO ATR0120Z', '09f51ceb-84c6-4a06-9216-69ac97b1143b.png', '- Quần âu phom Regular fit suông nhẹ, phù hợp với nhiều dáng người.\n- Màu sắc trung tính, dễ kết hợp trang phục khác, đường nét cắt may tinh tế, đơn giản nhưng vẫn đem lại diện mạo lịch lãm và nổi bật cho các quý ông.', '- 66% Polyester giúp quần bền màu, sắc nét và độ trơn trượt, mỏng nhẹ.\n- 28% Viscose mịn mượt, giúp quần nhẹ, thoáng mát tối đa.\n- 6% Spandex tạo độ co giãn nhẹ.', 900000.0000, 'Xám 55, ', 'Dáng vừa/ Regular Fit', 'S, M, XL, L, ', NULL, 150, 0, 150, NULL, 1, '2024-05-27 05:22:15', 'admin', '2024-05-27 05:22:15', NULL),
	(23, 13, 'QUẦN ÂU ARISTINO ATRR15', 'f3cb8b06-314c-4533-9519-0c06bbbdd0f8.png', '- Quần âu phom Slim Fit ôm nhẹ vừa vặn mà vẫn thoải mái vận động.\n- Quần thiết kế cơ bản, màu sắc trung tính, dễ dàng kết hợp với nhiều loại trang phục, đem lại diện mạo lịch lãm và tự tin cho người mặc.', '- 80% Polyester giúp quần bền màu, sắc nét, mặt vải trơn trượt, mỏng nhẹ.\n- 20% Rayon giúp quần có độ mềm mại, mát mẻ và bay rũ tự nhiên.\n', 1050000.0000, 'Xám 37, ', 'Slim Fit', 'S, M, L, XL, ', NULL, 320, 0, 510, NULL, 1, '2024-05-27 05:24:30', 'admin', '2024-05-27 05:24:30', NULL),
	(24, 13, 'QUẦN ÂU NAM ARISTINO ATRR04', '47b4030a-fa95-400b-ace0-ba2fe9849eed.png', '- Quần âu phom dáng Slim fit ôm vừa phải, tôn dáng người mặc.\n\n- Thiết kế chỉn chu với công nghệ nếp ly vĩnh viễn giúp quần luôn đứng dáng, mang đến vẻ lịch lãm. Các chi tiết được may tỉ mỉ, tinh tế. Gấu chờ, được may vừa vặn với số đo của từng khách hàng.', '- Chất liệu 70% Polyester kết hợp 28% sợi Rayon cho quần có độ cứng cáp và đứng dáng vừa đủ, đồng thời vẫn có bề mặt xốp nhẹ, thoáng mát dễ chịu. Đặc biệt, có thêm 2% spandex giúp quần có độ co giãn nhẹ mang lại cảm giác dễ chịu suốt ngày dài.', 750000.0000, 'Xanh cổ vịt 9, ', 'SLIM FIT', 'S, M, L, XL, ', NULL, 114, 6, 120, NULL, 1, '2024-05-27 05:33:24', 'admin', '2024-05-27 05:33:24', NULL);

-- Dumping structure for table mai_aura.product_import
CREATE TABLE IF NOT EXISTS `product_import` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `color` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quantity_import` int(11) DEFAULT NULL,
  `price_import` decimal(20,6) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.product_import: ~12 rows (approximately)
INSERT INTO `product_import` (`id`, `product_id`, `color`, `size`, `quantity_import`, `price_import`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 4, 'Đen kẻ trắng', 'L', 100, 120000.000000, 0, '2024-05-10 15:30:56', 'admin', '2024-05-10 18:12:19', NULL),
	(2, 6, 'Trắng in họa tiết AR', 'S', 120, 100000.000000, 1, '2024-05-19 03:25:24', 'admin', '2024-05-19 03:25:24', NULL),
	(3, 7, 'Đen kẻ trắng', 'L', 100, 200000.000000, 1, '2024-04-19 03:25:34', 'admin', '2024-05-23 08:37:30', NULL),
	(4, 9, 'Trắng kẻ xanh', 'L', 100, 400000.000000, 1, '2024-05-27 05:33:51', 'admin', '2024-05-27 05:33:51', NULL),
	(5, 20, 'Đỏ 20', 'M', 200, 309000.000000, 1, '2024-05-27 05:34:43', 'admin', '2024-05-27 05:34:43', NULL),
	(6, 9, 'Trắng kẻ xanh', 'XL', 123, 340000.000000, 1, '2024-05-27 05:35:10', 'admin', '2024-05-27 05:35:10', NULL),
	(7, 10, 'Đen solid', 'M', 234, 342000.000000, 1, '2024-05-27 05:35:50', 'admin', '2024-05-27 05:35:50', NULL),
	(8, 23, 'Xám 37', 'S', 190, 190000.000000, 1, '2024-05-27 05:36:21', 'admin', '2024-05-27 05:36:21', NULL),
	(9, 16, 'Cam 102 in', 'L', 120, 200000.000000, 1, '2024-05-27 05:36:54', 'admin', '2024-05-27 05:36:54', NULL),
	(10, 16, 'Cam 102 in', 'XL', 100, 100000.000000, 1, '2024-05-27 05:37:24', 'admin', '2024-05-27 05:37:24', NULL),
	(11, 23, 'Xám 37', 'L', 320, 156000.000000, 1, '2024-05-27 05:37:57', 'admin', '2024-05-27 05:37:57', NULL),
	(12, 12, 'Xanh tím than kẻ', 'L', 120, 130000.000000, 1, '2024-05-27 05:38:29', 'admin', '2024-05-27 05:38:29', NULL);

-- Dumping structure for table mai_aura.product_sales
CREATE TABLE IF NOT EXISTS `product_sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `quantity_sales` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.product_sales: ~0 rows (approximately)

-- Dumping structure for table mai_aura.product_size
CREATE TABLE IF NOT EXISTS `product_size` (
  `id_size` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.product_size: ~0 rows (approximately)

-- Dumping structure for table mai_aura.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.role: ~2 rows (approximately)
INSERT INTO `role` (`id`, `name`, `description`) VALUES
	(1, 'aura_user', 'Quyền người dùng'),
	(2, 'aura_admin', 'Quyền người quản trị');

-- Dumping structure for table mai_aura.shop
CREATE TABLE IF NOT EXISTS `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.shop: ~6 rows (approximately)
INSERT INTO `shop` (`id`, `shop_name`, `address`, `phone_number`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'Aura Royal City', 'Hà Nội', '098877546', 1, '2024-05-09 11:30:15', 'admin', '2024-05-09 14:16:36', NULL),
	(2, 'Test 1', 'Hà Nội', '09723645', 0, '2024-05-09 14:16:49', 'admin', '2024-05-09 14:16:49', NULL),
	(3, 'Ảino', 'fdsfdgr', '0827456', 0, '2024-05-10 15:02:34', 'admin', '2024-05-10 15:02:34', NULL),
	(4, NULL, NULL, NULL, 0, '2024-05-10 15:03:57', 'admin', '2024-05-10 15:03:57', NULL),
	(5, 'Aura Trần Duy Hưng', '176 Trần Duy Hưng, Hà Nội', '097655323', 1, '2024-05-19 03:16:56', 'admin', '2024-05-19 03:17:43', NULL),
	(6, 'Aura Cầu Giấy', '125 Dịch Vọng Hậu, Cầu Giấy, Hà Nội', '0087765899', 1, '2024-05-19 03:17:32', 'admin', '2024-05-19 03:17:32', NULL);

-- Dumping structure for table mai_aura.size
CREATE TABLE IF NOT EXISTS `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size_name` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(80) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.size: ~2 rows (approximately)
INSERT INTO `size` (`id`, `size_name`, `is_active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
	(1, 'S', 1, '2024-05-09 23:04:27', 'admin', '2024-05-09 23:04:28', 'admin'),
	(2, 'M', 1, '2024-05-09 23:04:40', 'admin', '2024-05-09 23:04:44', 'admin'),
	(3, 'L', 1, '2024-05-09 23:04:53', 'admin', '2024-05-09 23:04:58', 'admin'),
	(4, 'XL', 1, '2024-05-27 03:45:35', 'dattt', '2024-05-27 03:45:35', NULL);

-- Dumping structure for table mai_aura.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.user: ~3 rows (approximately)
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `address`, `phone_number`, `email`, `is_active`, `created_at`, `update_at`) VALUES
	(1, 'admin', 'MTIz', '123', '123', NULL, '098655', 'email', 1, '2024-05-18 18:44:03', '2024-05-22 14:42:10'),
	(2, 'admin1', '$2a$10$MA5A26iMlCVJequ32BqbceJnx.A8RwDyzGKPyhP3EG3jheqxBFjki', 'Đại', 'TT', NULL, '0838734', 'dsfhdsbfd', 1, '2024-05-22 18:14:46', '2024-05-22 18:14:47'),
	(3, 'dattt', '$2a$10$F2O8BRYE278ovnpT7YEbyOMys2FMiMZXwk.tFKWcB0STs5MhmZhr2', 'a', 'a', NULL, NULL, NULL, 1, '2024-05-24 02:12:57', '2024-05-24 02:12:57'),
	(4, 'daitt01', '$2a$10$cK0awrGzd6m3AKwAs.O2oOh1RQQA12C56v6O.u0P.0dDjxr2n611W', 'Trịnh', 'Đại', NULL, '09876342', NULL, 1, '2024-05-25 13:49:19', '2024-05-25 13:49:19');

-- Dumping structure for table mai_aura.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mai_aura.user_role: ~5 rows (approximately)
INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
	(2, 2, 2),
	(3, 1, 2),
	(4, 2, 1),
	(5, 3, 2),
	(6, 3, 1),
	(7, 4, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
