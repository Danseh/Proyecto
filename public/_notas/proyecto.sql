-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20220509161127','2022-05-09 18:11:39',139),('DoctrineMigrations\\Version20220516192413','2022-05-16 21:24:22',112),('DoctrineMigrations\\Version20220516195545','2022-05-16 21:55:54',18),('DoctrineMigrations\\Version20220516200458','2022-05-16 22:05:08',63),('DoctrineMigrations\\Version20220517164254','2022-05-17 18:43:04',107),('DoctrineMigrations\\Version20220522233715','2022-05-23 01:37:23',134),('DoctrineMigrations\\Version20220527164029','2022-05-27 18:40:40',179),('DoctrineMigrations\\Version20220527165729','2022-05-27 18:57:36',58),('DoctrineMigrations\\Version20220527165919','2022-05-27 18:59:24',77);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piso`
--

DROP TABLE IF EXISTS `piso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `piso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) DEFAULT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `ciudad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagenes` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '(DC2Type:array)',
  `precio` int(11) DEFAULT NULL,
  `plazas` int(11) NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_disponible` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D462D9D37E3C61F9` (`owner_id`),
  CONSTRAINT `FK_D462D9D37E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piso`
--

LOCK TABLES `piso` WRITE;
/*!40000 ALTER TABLE `piso` DISABLE KEYS */;
INSERT INTO `piso` VALUES (25,2,'piso granada','piso en grana mu grande',NULL,'Granada','C/aaa nº4','a:2:{i:0;s:42:\"/pisos/piso granada/piso-6293d783d7b5e.jpg\";i:1;s:43:\"/pisos/piso granada/piso1-6293d783d8095.jpg\";}',200,4,'Disponible',NULL),(26,2,'piso madrid','piso en madrid mu bonico',NULL,'Madrid','C/bb nº4','a:2:{i:0;s:41:\"/pisos/piso madrid/piso-6293d79a463f9.jpg\";i:1;s:42:\"/pisos/piso madrid/piso1-6293d79a46892.jpg\";}',150,3,'Disponible',NULL),(27,2,'piso 3','Piso en barcelona centro',NULL,'Barcelona','c/cc nº8','a:2:{i:0;s:36:\"/pisos/piso 3/piso-6293eaa7f27d9.jpg\";i:1;s:37:\"/pisos/piso 3/piso1-6293eaa7f2cd8.jpg\";}',300,4,'Disponible',NULL),(28,2,'piso 4','piso en Valencia guapo',NULL,'Valencia','c/dd nº10','a:2:{i:0;s:36:\"/pisos/piso 4/piso-6293ef21ef2d6.jpg\";i:1;s:37:\"/pisos/piso 4/piso1-6293ef21f221d.jpg\";}',250,3,'Disponible',NULL),(29,2,'piso 4','piso en Valencia guapo',NULL,'Valencia','c/dd nº10','a:2:{i:0;s:36:\"/pisos/piso 4/piso-6293ef21ef2d6.jpg\";i:1;s:37:\"/pisos/piso 4/piso1-6293ef21f221d.jpg\";}',250,3,'Disponible',NULL),(30,2,'piso 4','piso en Valencia guapo',NULL,'Valencia','c/dd nº10','a:2:{i:0;s:36:\"/pisos/piso 4/piso-6293ef21ef2d6.jpg\";i:1;s:37:\"/pisos/piso 4/piso1-6293ef21f221d.jpg\";}',250,3,'Disponible',NULL),(31,2,'piso 4','piso en Valencia guapo',NULL,'Valencia','c/dd nº10','a:2:{i:0;s:36:\"/pisos/piso 4/piso-6293ef21ef2d6.jpg\";i:1;s:37:\"/pisos/piso 4/piso1-6293ef21f221d.jpg\";}',250,3,'Disponible',NULL),(32,2,'piso 4','piso en Valencia guapo',NULL,'Valencia','c/dd nº10','a:2:{i:0;s:36:\"/pisos/piso 4/piso-6293ef21ef2d6.jpg\";i:1;s:37:\"/pisos/piso 4/piso1-6293ef21f221d.jpg\";}',250,3,'Disponible',NULL),(33,NULL,'piso 5','aaa',NULL,'Alicante','c/dff nº10','a:3:{i:0;s:36:\"/pisos/piso 5/piso-629531b049cde.jpg\";i:1;s:37:\"/pisos/piso 5/piso1-629531b04b0ff.jpg\";i:2;s:37:\"/pisos/piso 5/piso2-629531b04b4dc.jpg\";}',200,4,'Disponible',NULL),(34,NULL,'piso blabla','aaa',NULL,'Murcia','C/aaa nº4','a:1:{i:0;s:42:\"/pisos/piso blabla/piso2-629d17f7c6b1b.jpg\";}',200,4,'Disponible',NULL);
/*!40000 ALTER TABLE `piso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piso_user`
--

DROP TABLE IF EXISTS `piso_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `piso_user` (
  `piso_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`piso_id`,`user_id`),
  KEY `IDX_EBB84A9D1AC830AF` (`piso_id`),
  KEY `IDX_EBB84A9DA76ED395` (`user_id`),
  CONSTRAINT `FK_EBB84A9D1AC830AF` FOREIGN KEY (`piso_id`) REFERENCES `piso` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_EBB84A9DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piso_user`
--

LOCK TABLES `piso_user` WRITE;
/*!40000 ALTER TABLE `piso_user` DISABLE KEYS */;
INSERT INTO `piso_user` VALUES (26,3);
/*!40000 ALTER TABLE `piso_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `informacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gustos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `piso_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`),
  KEY `IDX_8D93D6491AC830AF` (`piso_id`),
  CONSTRAINT `FK_8D93D6491AC830AF` FOREIGN KEY (`piso_id`) REFERENCES `piso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'test','[]','$2y$13$wdl5LHzhF.cd8Y.rT0s4h.abXOzeYmUzUS99qWOopZGdvIi7zJw8i',18,'Mujer','hola soy alberto','me gustan los videojuegos','/profiles/test/perfil-6293bcf847fd1.jpg','antonio','lopez',655374921,'xxfirox123@gmail.com',NULL),(3,'alberto','[]','$2y$13$zOia38A2tn3SXopABjuoY.xfKEXFlAhDOgPwl.1ah.e4r/JN4bii2',NULL,NULL,NULL,NULL,NULL,'alberto','fernandez silva',NULL,NULL,25);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-09 22:51:30
