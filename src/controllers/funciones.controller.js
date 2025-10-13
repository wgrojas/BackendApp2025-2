import connection from "../../lib/db.js";
/* CREAR UNA FUNCIÓN --> CREAR DATOS */
/* INSERT INTO carreras 
      (codigo_snies, nombre, id_jornada, tipo_programa_id, modalidad_programa, sede_id, semestres_totales) 
    VALUES (?, ?, ?, ?, ?, ?, ?) */

export const crearDatos = (req, res, next) => {
<<<<<<< HEAD
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
=======
  const modalidad = req.body.modalidad;
  //console.log("🚀 ~ crearDatos ~ modalidad:", modalidad)
  const nombre = req.body.nombre;
  //console.log("🚀 ~ crearDatos ~ nombre:", nombre);return;
  //console.log("He ingresado a la función crearDatos!");
  /* PARA RESPONDER UN ESTADO HTTP  */
  const sql = `insert into jornada (nombre, modalidad) values (?, ?)`;
  const params = [nombre, modalidad];
>>>>>>> 89b2cacb142157789b9eb7fdea9ab2ba296b34ba

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error en crearDatos:", err);
<<<<<<< HEAD
      return res.status(500).json({ error: "Error al crear el nombre." });
    }
    return res.status(200).json({
      message: "Nombre creado",
=======
      return res.status(500).json({ error: "Error al crear la carrera." });
    }
    return res.status(201).json({
      message: "Jornada  creada",
>>>>>>> 89b2cacb142157789b9eb7fdea9ab2ba296b34ba
      id: result.insertId,
    });
  });
};

export const consultarDatos = (req, res, next) => {
  ////console.log("He ingresado a la función consultarDatos!");
  const sql = `SELECT * FROM jornada`;

  //const params = ["jornada"];
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error en consultar datos:", err);
      return res
        .status(500)
        .json({ error: "Error al consltar datos de la jornada." });
    }
    return res.status(201).json({
      message: "",
    });
  });
};

export const eliminarDatos = (req, res, next) => {
  //console.log("He ingresado a la función eliminarDatos!");
};

export const actualizarDatos = (req, res, next) => {
  console.log("He ingresado a la función actualizarDatos!");
};
