import connection from "../../lib/db.js";
/* CREAR UNA FUNCIÓN --> CREAR DATOS */
export const crearDatos = (req, res, next) => {
  console.log("🚀 ~ crearDatos ~ req:", req.body.nombre);

  console.log("He ingresado a la función crearDatos!");
  // res.json({ mensaje: "Funcion crear datos" });
  // res.status(203).json({message:"He ingresado al controlador crear datos"})
  res.status(203).json({ message: req.body });

  const nombre = req.body.nombre;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;
  const correo = req.body.correo;
  return;
  const sql =
    "insert into provedor (nombre,telefono,direccion,correo) values (?,?,?,?)";
  const params = [nombre, telefono, direccion, correo];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error en crearDatos:", err);
      return res.status(500).json({ error: "Error al crear el nombre." });
    }
    return res.status(200).json({
      message: "Nombre creado",
      id: result.insertId,
    });
  });
};

export const consultarDatos = (req, res, next) => {
  console.log("He ingresado a la función consultarDatos!");
};

export const eliminarDatos = (req, res, next) => {
  console.log("He ingresado a la función eliminarDatos!");
};

export const actualizarDatos = (req, res, next) => {
  console.log("He ingresado a la función actualizarDatos!");
};
