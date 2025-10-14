// Importo la conexión a la base de datos
import connection from "../../lib/db.js";

/* FUNCIÓN: crearDatos Esta función inserta un nuevo proveedor, pero primero verifica que no exista otro con el mismo nombre o correo. */
export const crearDatos = (req, res, next) => {
  console.log("🚀 ~ crearDatos ~ body recibido:", req.body);

  // Extraigo los datos que llegan desde el frontend
  const { nombre, telefono, direccion, correo } = req.body;

  // Verifico que no haya campos vacíos
  if (!nombre || !telefono || !direccion || !correo) {
    return res.status(400).json({ error: "Faltan datos en la solicitud." });
  }

  // Primero verifico si ya existe un proveedor con ese nombre o correo
  const sqlVerificar = "SELECT * FROM proveedor WHERE nombre = ? OR correo = ?";
  const paramsVerificar = [nombre, correo];

  connection.query(sqlVerificar, paramsVerificar, (err, results) => {
    if (err) {
      console.error("Error al verificar proveedor:", err);
      return res
        .status(500)
        .json({ error: "Error al verificar el proveedor." });
    }

    // Si la consulta devuelve algún resultado, el proveedor ya existe
    if (results.length > 0) {
      console.log("El proveedor ya existe en la base de datos.");
      return res.status(409).json({
        // 409 = conflicto (recurso duplicado)
        message: "El proveedor ya está registrado.",
      });
    }

    // Si no existe, se crea normalmente el nuevo registro
    const sqlInsertar =
      "INSERT INTO proveedor (nombre, telefono, direccion, correo) VALUES (?, ?, ?, ?)";
    const paramsInsertar = [nombre, telefono, direccion, correo];

    connection.query(sqlInsertar, paramsInsertar, (err, result) => {
      if (err) {
        console.error("Error al crear proveedor:", err);
        return res.status(500).json({ error: "Error al crear el proveedor." });
      }

      console.log("Proveedor insertado con ID:", result.insertId);

      return res.status(201).json({
        message: "Proveedor creado correctamente",
        id: result.insertId,
      });
    });
  });
};


/* FUNCIÓN: consultarDatos
   Esta función consulta todos los proveedores guardados
   en la base de datos y los devuelve al frontend en formato JSON.*/
export const consultarDatos = (req, res, next) => {
  console.log("He ingresado a la función consultarDatos!");

  // Consulta SQL para traer todos los proveedores
  const sql = "SELECT * FROM proveedor";

  // Ejecuto la consulta
  connection.query(sql, (err, results) => {
    if (err) {
      // Si hay un error, lo muestro en consola y respondo con error
      console.error("Error al consultar los proveedores:", err);
      return res.status(500).json({ error: "Error al consultar los datos." });
    }

    // Si no hay error, verifico si hay registros
    if (results.length === 0) {
      console.log("No hay proveedores registrados en la base de datos.");
      return res.status(200).json({
        message: "No hay proveedores registrados.",
        data: [],
      });
    }

    // Si hay resultados, los muestro en consola y los envío al frontend
    console.log("Proveedores encontrados:", results.length);
    return res.status(200).json({
      message: "Consulta realizada correctamente",
      total: results.length,
      data: results,
    });
  });
};



/*  FUNCIÓN: eliminarDatos(En el futuro eliminará un proveedor por su ID)*/
export const eliminarDatos = (req, res, next) => {
  console.log("He ingresado a la función eliminarDatos!");
  res.status(200).json({ message: "Eliminación ejecutada correctamente" });
};

/* FUNCIÓN: actualizarDatos(Servirá para editar los datos de un proveedor)*/
export const actualizarDatos = (req, res, next) => {
  console.log("He ingresado a la función actualizarDatos!");
  res.status(200).json({ message: "Actualización ejecutada correctamente" });
};
