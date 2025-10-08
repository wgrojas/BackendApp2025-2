import connection from "../../lib/db.js";
/* CREAR UNA FUNCIÓN --> CREAR DATOS */
/* INSERT INTO carreras 
      (codigo_snies, nombre, id_jornada, tipo_programa_id, modalidad_programa, sede_id, semestres_totales) 
    VALUES (?, ?, ?, ?, ?, ?, ?) */

export const crearDatos = (req, res, next) => {
  const modalidad = req.body.modalidad;
  //console.log("🚀 ~ crearDatos ~ modalidad:", modalidad)
  const nombre = req.body.nombre;
  //console.log("🚀 ~ crearDatos ~ nombre:", nombre);return;
  //console.log("He ingresado a la función crearDatos!");
  /* PARA RESPONDER UN ESTADO HTTP  */
  const sql = `insert into jornada (nombre, modalidad) values (?, ?)`;
  const params = [nombre, modalidad];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error en crearDatos:", err);
      return res.status(500).json({ error: "Error al crear la carrera." });
    }
    return res.status(201).json({
      message: "Jornada  creada",
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
