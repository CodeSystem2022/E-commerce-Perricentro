import express from "express";
import authRoutes from "./router/auth.routes.js";

const app = express();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => res.json({ message: "Bienvenidos a Perricentro E-commerce"}));
app.use('/api', authRoutes);

//Manejando errores
app.use((err,req,res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

export default app;