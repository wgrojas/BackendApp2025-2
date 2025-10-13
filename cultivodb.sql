CREATE TABLE `Producto` (
  `id_producto` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `vlr_unit` float(5,2) NOT NULL,
  `categoria` varchar(50) DEFAULT null,
  `referencia` varchar(20) UNIQUE NOT NULL,
  `created_at` date DEFAULT 'now()'
);

CREATE TABLE `Proveedor` (
  `id_proveedor` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL
);

CREATE TABLE `detalle_producto` (
  `id_detalle` int UNIQUE PRIMARY KEY NOT NULL,
  `id_proveedor` int NOT NULL,
  `id_producto` int NOT NULL
);

ALTER TABLE `detalle_producto` ADD FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`);

ALTER TABLE `detalle_producto` ADD FOREIGN KEY (`id_proveedor`) REFERENCES `Proveedor` (`id_proveedor`);
