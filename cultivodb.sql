CREATE TABLE Producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  vlr_unit FLOAT(10,2) NOT NULL,
  categoria VARCHAR(50) DEFAULT NULL,
  referencia VARCHAR(20) UNIQUE NOT NULL,
  created_at DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Proveedor (
  id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL
);

CREATE TABLE detalle_producto (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_proveedor INT NOT NULL,
  id_producto INT NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_proveedor) REFERENCES Proveedor (id_proveedor)
    ON DELETE CASCADE ON UPDATE CASCADE
);
