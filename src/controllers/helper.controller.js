// controllers/carreras.controller.js
import connection from "../../lib/db.js";

/**
 * POST /api/carreras
 * Body JSON esperado: { nombre: string, codigo: string, creditos?: number }
 */
export const crearDatos = async (req, res, next) => {
  console.log("He ingresado a la función crearDatos!");
  try {
    const { nombre, codigo, creditos = null } = req.body ?? {};

    if (!nombre || !codigo) {
      return res.status(400).json({ error: "Faltan campos: nombre y codigo son obligatorios." });
    }

    const sql = `
      INSERT INTO carreras (nombre, codigo, creditos)
      VALUES (?, ?, ?)
    `;
    const params = [nombre, codigo, creditos];

    const [result] = await connection.execute(sql, params);

    return res.status(201).json({
      message: "Carrera creada correctamente",
      id: result.insertId,
      data: { nombre, codigo, creditos }
    });
  } catch (err) {
    console.error("Error en crearDatos:", err);
    return res.status(500).json({ error: "Error interno al crear la carrera." });
  }
};

/**
 * GET /api/carreras
 * Soporta:
 *  - /api/carreras?id=123                -> trae un registro por id
 *  - /api/carreras?search=ing&limit=10   -> lista con filtro por nombre/código
 *  - /api/carreras?limit=10&offset=0     -> paginación
 */
export const consultarDatos = async (req, res, next) => {
  console.log("He ingresado a la función consultarDatos!");
  try {
    const { id, search = "", limit = 20, offset = 0 } = req.query;

    if (id) {
      // Consulta por ID
      const sqlById = `SELECT id, nombre, codigo, creditos FROM carreras WHERE id = ? LIMIT 1`;
      const [rows] = await connection.execute(sqlById, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: "No se encontró la carrera solicitada." });
      }
      return res.json(rows[0]);
    }

    // Lista con búsqueda y paginación
    const like = `%${search}%`;
    const sqlList = `
      SELECT id, nombre, codigo, creditos
      FROM carreras
      WHERE (? = '' OR nombre LIKE ? OR codigo LIKE ?)
      ORDER BY id DESC
      LIMIT ?
    `;
    const params = [search, like, like, Number(limit)];
    const [rows] = await connection.execute(sqlList, params);

    // (Opcional) total para front-ends paginados
    const [countRows] = await connection.execute(
      `SELECT COUNT(*) AS total
       FROM carreras
       WHERE (? = '' OR nombre LIKE ? OR codigo LIKE ?)`,
      [search, like, like]
    );

    return res.json({
      data: rows,
      pagination: {
        total: countRows[0]?.total ?? 0,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
  } catch (err) {
    console.error("Error en consultarDatos:", err);
    return res.status(500).json({ error: "Error interno al consultar las carreras." });
  }
};

/**
 * DELETE /api/carreras/:id
 */
export const eliminarDatos = async (req, res, next) => {
  console.log("He ingresado a la función eliminarDatos!");
  try {
    const { id } = req.params;
    const [result] = await connection.execute(`DELETE FROM carreras WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No existe la carrera a eliminar." });
    }
    return res.json({ message: "Carrera eliminada." });
  } catch (err) {
    console.error("Error en eliminarDatos:", err);
    return res.status(500).json({ error: "Error interno al eliminar la carrera." });
  }
};

/**
 * PUT /api/carreras/:id
 * Body JSON: { nombre?, codigo?, creditos? }
 */
export const actualizarDatos = async (req, res, next) => {
  console.log("He ingresado a la función actualizarDatos!");
  try {
    const { id } = req.params;
    const { nombre, codigo, creditos } = req.body ?? {};

    // Construcción dinámica del UPDATE
    const fields = [];
    const params = [];
    if (nombre !== undefined) { fields.push("nombre = ?"); params.push(nombre); }
    if (codigo !== undefined) { fields.push("codigo = ?"); params.push(codigo); }
    if (creditos !== undefined) { fields.push("creditos = ?"); params.push(creditos); }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar." });
    }

    const sql = `UPDATE carreras SET ${fields.join(", ")} WHERE id = ?`;
    params.push(id);

    const [result] = await connection.execute(sql, params);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No existe la carrera a actualizar." });
    }
    return res.json({ message: "Carrera actualizada correctamente." });
  } catch (err) {
    console.error("Error en actualizarDatos:", err);
    return res.status(500).json({ error: "Error interno al actualizar la carrera." });
  }
};
