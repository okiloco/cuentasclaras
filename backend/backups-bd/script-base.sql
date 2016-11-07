/*
SQLyog Ultimate v8.61 
MySQL - 5.6.17 : Database - cuentasclaras
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `planilla` */

DROP TABLE IF EXISTS `planilla`;

CREATE TABLE `planilla` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `prestamo_id` bigint(20) DEFAULT NULL,
  `abono_intereses` float DEFAULT NULL,
  `abono_capital` float DEFAULT NULL,
  `fecha_abono` date NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_planilla_prestamo` (`prestamo_id`),
  CONSTRAINT `FK_planilla_prestamo` FOREIGN KEY (`prestamo_id`) REFERENCES `prestamo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `planilla` */

/*Table structure for table `prestamo` */

DROP TABLE IF EXISTS `prestamo`;

CREATE TABLE `prestamo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `monto` float DEFAULT NULL,
  `tasa_interes` int(20) DEFAULT NULL,
  `deudor_id` bigint(20) DEFAULT NULL,
  `acreedor_id` bigint(20) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `usuario_registra_id` bigint(20) DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_prestamo_acreedor` (`acreedor_id`),
  KEY `FK_prestamo_deudor` (`deudor_id`),
  KEY `FK_prestamo_registra` (`usuario_registra_id`),
  CONSTRAINT `FK_prestamo_registra` FOREIGN KEY (`usuario_registra_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_prestamo_acreedor` FOREIGN KEY (`acreedor_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK_prestamo_deudor` FOREIGN KEY (`deudor_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `prestamo` */

/*Table structure for table `rol` */

DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `rol` */

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rol_id` bigint(20) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_usuario_rol` (`rol_id`),
  CONSTRAINT `FK_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
