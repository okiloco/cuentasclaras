/*
SQLyog Community v11.51 (32 bit)
MySQL - 5.7.11 : Database - cuentasclaras
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cuentasclaras` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cuentasclaras`;

/*Table structure for table `planilla` */

DROP TABLE IF EXISTS `planilla`;

CREATE TABLE `planilla` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `restante` float NOT NULL COMMENT 'Total restante del prestamo',
  `prestamo_id` bigint(20) NOT NULL,
  `intereses` float DEFAULT NULL COMMENT 'Abono Cuota de Intereses',
  `capital` float DEFAULT NULL COMMENT 'Abono capital',
  `fecha_pago` date DEFAULT NULL,
  `gestor_id` bigint(20) DEFAULT NULL COMMENT 'El gestor se encarga de hacer todo el manejo de la documentación necesaria antes y después de la firma del contrato.',
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ID_PRESTAMO_FK` (`prestamo_id`),
  CONSTRAINT `ID_PRESTAMO_FK` FOREIGN KEY (`prestamo_id`) REFERENCES `planilla` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `planilla` */

/*Table structure for table `prestamo` */

DROP TABLE IF EXISTS `prestamo`;

CREATE TABLE `prestamo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` float NOT NULL,
  `tasa` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_pagos` date DEFAULT NULL,
  `acredor_id` bigint(20) DEFAULT NULL COMMENT 'El acreedor del crédito es el que presta al deudor',
  `deudor_id` bigint(20) DEFAULT NULL COMMENT 'El deudor es quien solicita el crédito',
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ID_DEUDOR_FK` (`deudor_id`),
  KEY `ID_ACREDOR_FK` (`acredor_id`),
  CONSTRAINT `ID_ACREDOR_FK` FOREIGN KEY (`acredor_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `ID_DEUDOR_FK` FOREIGN KEY (`deudor_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `prestamo` */

insert  into `prestamo`(`id`,`cantidad`,`tasa`,`fecha_inicio`,`fecha_pagos`,`acredor_id`,`deudor_id`,`estado`) values (1,500000,10,'2016-11-01',NULL,1,1,1),(2,500000,10,'2016-11-01',NULL,1,1,1);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

insert  into `roles`(`id`,`nombre`,`estado`) values (1,'Super Administrador',1),(2,'Admin',1),(3,'Usuario',1);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `primer_nombre` varchar(200) DEFAULT NULL,
  `segundo_nombre` varchar(200) DEFAULT NULL,
  `primer_apellido` varchar(200) DEFAULT NULL,
  `segundo_apellido` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` text,
  `rol_id` bigint(20) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ID_ROL_FK` (`rol_id`),
  CONSTRAINT `ID_ROL_FK` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`id`,`primer_nombre`,`segundo_nombre`,`primer_apellido`,`segundo_apellido`,`email`,`telefono`,`direccion`,`username`,`password`,`rol_id`,`estado`) values (1,'Fabian ','Vargas',NULL,NULL,NULL,NULL,NULL,'admin','202cb962ac59075b964b07152d234b70',1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
