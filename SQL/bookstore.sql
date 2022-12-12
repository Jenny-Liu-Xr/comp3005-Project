/*
 Navicat Premium Data Transfer

 Source Server         : mysql-local
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : bookstore

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 12/12/2022 12:18:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for billing
-- ----------------------------
DROP TABLE IF EXISTS `billing`;
CREATE TABLE `billing`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `order_ID` int NULL DEFAULT NULL,
  `user_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `billing_user_ID`(`user_ID` ASC) USING BTREE,
  INDEX `billing_order_ID`(`order_ID` ASC) USING BTREE,
  CONSTRAINT `billing_order_ID` FOREIGN KEY (`order_ID`) REFERENCES `order` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `billing_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of billing
-- ----------------------------
INSERT INTO `billing` VALUES (1, 'Cost of purchasing books', 2.74, 13, 5);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `ISBN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `genre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `pages` int NULL DEFAULT NULL,
  `publisher_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`) USING BTREE,
  INDEX `book_publisher_ID`(`publisher_ID` ASC) USING BTREE,
  CONSTRAINT `book_publisher_ID` FOREIGN KEY (`publisher_ID`) REFERENCES `publisher` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('143-4693475874', 'Mindset: The New Psychology of Success', 'Carol S. Dweck', 'Health', 8.55, 95, 1);
INSERT INTO `book` VALUES ('250-5467347835', 'Herbs for Medicine and Metaphysics', 'Kali J.N.S', 'Health', 9.99, 361, 2);
INSERT INTO `book` VALUES ('342-4958394754', 'And There Was Light: Abraham Lincoln and the American Struggle', 'Jon Meacham', 'Biographies', 22.99, 231, 1);
INSERT INTO `book` VALUES ('432-4567843786', 'The Richest Man in Babylon', 'George S. Clason', 'History', 3.99, 241, 3);
INSERT INTO `book` VALUES ('457-4395894385', 'The U.S. Constitution, Declaration of Independence, Bill of Rights with Amendments: Pocket Size (Annotated)', 'U.S. Constitution', 'Law', 5.75, 233, 3);
INSERT INTO `book` VALUES ('583-3936158007', 'test12', 'fgddfgdf', 'Biographies', 43.33, 100, 2);
INSERT INTO `book` VALUES ('675-4965497483', 'How To Draw 101 Cute Stuff For Kids', 'Sophia Elizabeth', 'Arts', 9.99, 43, 2);
INSERT INTO `book` VALUES ('754-3582787453', 'The Light We Carry: Overcoming in Uncertain Times', 'Michelle Obama', 'Biographies', 16.99, 125, 3);
INSERT INTO `book` VALUES ('847-3248725324', 'A Passionate Life: W. H. H. Murray, from Preacher to Progressive (Excelsior Editions)', 'Randall S. Beach', 'Law', 18.99, 186, 1);
INSERT INTO `book` VALUES ('864-3482375682', 'Democracy\'s Data: The Hidden Stories in the U.S. Census and How to Read Them', 'Dan Bouk', 'History', 25.49, 451, 2);
INSERT INTO `book` VALUES ('913-0385673139', 'A Passionate Life: W. H. H. Murray, from Preacher to Progressive (Excelsior Editions)', 'Randall S. Beach', 'Law', 45.21, 352, 2);
INSERT INTO `book` VALUES ('979-8701873146', 'Radio\'s Greatest of All Time', 'Rush Limbaugh', 'Arts', 21.49, 345, 1);

-- ----------------------------
-- Table structure for checkout_basket
-- ----------------------------
DROP TABLE IF EXISTS `checkout_basket`;
CREATE TABLE `checkout_basket`  (
  `ISBN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_ID` int NOT NULL,
  `quantity` int NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`, `user_ID`) USING BTREE,
  INDEX `checkout_basket_user_ID`(`user_ID` ASC) USING BTREE,
  CONSTRAINT `checkout_basket_ISBN` FOREIGN KEY (`ISBN`) REFERENCES `book` (`ISBN`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `checkout_basket_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of checkout_basket
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10, 2) NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (13, 2.74, '2022-12-12 10:27:38');

-- ----------------------------
-- Table structure for order_books
-- ----------------------------
DROP TABLE IF EXISTS `order_books`;
CREATE TABLE `order_books`  (
  `order_ID` int NOT NULL,
  `user_ID` int NOT NULL,
  `ISBN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`order_ID`, `user_ID`, `ISBN`) USING BTREE,
  INDEX `order_books_ISBN`(`ISBN` ASC) USING BTREE,
  INDEX `order_books_user_ID`(`user_ID` ASC) USING BTREE,
  CONSTRAINT `order_books_ISBN` FOREIGN KEY (`ISBN`) REFERENCES `book` (`ISBN`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_books_order_ID` FOREIGN KEY (`order_ID`) REFERENCES `order` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_books_user_ID` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_books
-- ----------------------------
INSERT INTO `order_books` VALUES (13, 5, '432-4567843786', '1', 3.99);
INSERT INTO `order_books` VALUES (13, 5, '457-4395894385', '2', 5.75);

-- ----------------------------
-- Table structure for owner
-- ----------------------------
DROP TABLE IF EXISTS `owner`;
CREATE TABLE `owner`  (
  `ID` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of owner
-- ----------------------------
INSERT INTO `owner` VALUES (1, 'admin@gmail.com', '123456', 'admin', '78495637104');

-- ----------------------------
-- Table structure for publisher
-- ----------------------------
DROP TABLE IF EXISTS `publisher`;
CREATE TABLE `publisher`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `banking_account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of publisher
-- ----------------------------
INSERT INTO `publisher` VALUES (1, 'Mary L. Cohen', '45675656457', '800 W Avon Rd, Rochester Hills, MI 48307, United States', 'Mary@gmail.com', '45437583746273');
INSERT INTO `publisher` VALUES (2, 'Lyndall Gordon', '67546645354', '800 W Avon Rd, Rochester Hills, MI 48307, United States', 'Lyndall@gmail.com', '54657754665345');
INSERT INTO `publisher` VALUES (3, 'Terry Glaspey', '65765756751', '800 W Avon Rd, Rochester Hills, MI 48307, United States', 'Terry@gmail.com', '87433523423432');

-- ----------------------------
-- Table structure for shipping
-- ----------------------------
DROP TABLE IF EXISTS `shipping`;
CREATE TABLE `shipping`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `datetime` datetime NULL DEFAULT NULL,
  `order_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `shipping_order_ID`(`order_ID` ASC) USING BTREE,
  CONSTRAINT `shipping_order_ID` FOREIGN KEY (`order_ID`) REFERENCES `order` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shipping
-- ----------------------------
INSERT INTO `shipping` VALUES (1, 'Order created, waiting for delivery', '2022-12-12 10:27:38', 13);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, 'test@gmail.com', '123456', 'test', '4537675634', 'rwlkerklfvdf');

SET FOREIGN_KEY_CHECKS = 1;
