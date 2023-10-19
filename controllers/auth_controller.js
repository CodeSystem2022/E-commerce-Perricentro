import { pool } from "../db.js";
import bcrypt from 'bcrypt'; //importamos bcrypt
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5";

export const signup = async (req, res, next) => {
    const { nombre, apellido, email, pass } = req.body;

    try {
        //encriptamos el password antes de que lo ingrese a la bd
        const hashedPassword = await bcrypt.hash(pass, 10); //se repite entre 10 y 15 veces el algoritmo
        md5(email);
        const gravatar = "https://gravatar.com/avatar/" + md5(email); //guarda el hash en la constante
        //console.log(hashedPassword);


        const result = await pool.query("INSERT INTO usuarios (nombre, apellido, email, pass) VALUES ($1, $2, $3, $4) RETURNING *", [nombre, apellido, email, hashedPassword]); //guardamos la contraseña ya hasheada

        const token = await createAccessToken({id: result.rows[0].id });
        console.log(result);
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            samSite: "none",
            maxAge: 60 *60 *24 * 1000,}); // 1day})
        return res.json(result.rows[0]);
    } catch (error) {
        if(error.code === "23505"){
            return res.status(400).json({message: "El correo ya esta registrado"});
        }
        next (error);

    }
};