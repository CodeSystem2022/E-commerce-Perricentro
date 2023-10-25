
import Router from "express-promise-router";
import { signup } from "../controllers/auth_controller.js"; 


const router = Router();



router.post("/signup", signup);


export default router; 