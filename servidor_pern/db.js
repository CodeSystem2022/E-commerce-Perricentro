// En este archivo vamos a generar la conección a nuestra base de datos.
import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "bcosimano/*5948",
    database: "PERRICENTRO",
});

pool.on("connect", () => {
    console.log("conectado a la base de datos");
});