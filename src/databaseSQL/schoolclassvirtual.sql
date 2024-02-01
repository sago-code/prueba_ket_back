-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2024 a las 03:27:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `schoolclassvirtual`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_access_token` (IN `p_userId` INT, IN `p_accessToken` VARCHAR(255))   BEGIN
    INSERT INTO tokens (userId, accessToken, createAt, updateAt, deleteAt)
    VALUES (p_userId, p_accessToken, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_user` (IN `p_name` VARCHAR(80), IN `p_lastName` VARCHAR(150), IN `p_userName` VARCHAR(50), IN `p_password` VARCHAR(150), IN `p_userTypeId` INT)   BEGIN
    INSERT INTO users (name, lastName, userName, password, userTypeId, createAt, updateAt, deleteAt)
    VALUES (p_name, p_lastName, p_userName, p_password, p_userTypeId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `p_userName` VARCHAR(50), IN `p_password` VARCHAR(150))   BEGIN
    SELECT id
    FROM users
    WHERE userName = p_userName AND password = p_password;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `accessToken` varchar(150) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleteAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleteAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastName`, `userName`, `password`, `userTypeId`, `createAt`, `updateAt`, `deleteAt`) VALUES
(1, 'Larry', 'Cabolla', 'LarryBolla306', '123456', 1, '2024-01-31 21:37:07', '2024-01-31 21:37:07', NULL),
(2, 'Mirian', 'Doano', 'MiranDoANdo88', '54345', 2, '2024-01-31 21:44:28', '2024-01-31 21:44:28', NULL),
(3, 'Bese', 'Rro', 'SoyElBeserro12', '54376', 2, '2024-01-31 21:46:40', '2024-01-31 21:46:40', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usertype`
--

CREATE TABLE `usertype` (
  `id` int(11) NOT NULL,
  `userTypeName` varchar(50) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleteAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usertype`
--

INSERT INTO `usertype` (`id`, `userTypeName`, `createAt`, `updateAt`, `deleteAt`) VALUES
(1, 'Estudiante', '2024-01-31 20:34:22', '2024-01-31 20:34:22', NULL),
(2, 'Moderador', '2024-01-31 20:34:35', '2024-01-31 20:34:35', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_94f168faad896c0786646fa3d4a` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usertype`
--
ALTER TABLE `usertype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `FK_94f168faad896c0786646fa3d4a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
