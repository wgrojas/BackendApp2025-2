CREATE TABLE `Producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `vlr_unit` FLOAT(10,2) NOT NULL, -- Aumenté la precisión
  `categoria` VARCHAR(50) DEFAULT NULL,
  `referencia` VARCHAR(20) UNIQUE NOT NULL,
  `created_at` DATE DEFAULT (CURRENT_DATE), -- 'now()' no funciona en DEFAULT de tipo DATE
  PRIMARY KEY (`id_producto`)
);

CREATE TABLE `Proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `direccion` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_proveedor`)
);

CREATE TABLE `detalle_producto` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NOT NULL,
  `id_producto` INT NOT NULL,
  PRIMARY KEY (`id_detalle`),
  FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_proveedor`) REFERENCES `Proveedor` (`id_proveedor`)
    ON DELETE CASCADE ON UPDATE CASCADE
);
