import express from "express";
import cors from "cors";
import pkg from "express-validator";

const app = express();
import functionRoutes from "./src/routers/funciones.routes.js"
const { body, query, validationResult, ExpressValidator } = pkg;

app.use(cors({ origin: "*" }));

app.use(express.json());
//PRESENTACIÓN DE LAS RUTAS
app.use("/api", functionRoutes);
// manejo de errores - middleware

app.use((req, res, next) => {
  console.log("Peticion a ruta no encontrada...");
  res.status(404).json({ message: "Ruta no encontrada..." });
});

export default app;
