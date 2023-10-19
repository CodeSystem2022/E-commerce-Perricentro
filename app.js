import express from "express";

const app = express();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => res.json({ message: "Bienvenidos a Perricentro E-commerce"}));

export default app;