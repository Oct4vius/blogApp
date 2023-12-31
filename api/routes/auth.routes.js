import { Router } from "express";
import * as auth from '../controllers/auth.controller.js';

const router = Router()

router.get("/cookie", (req, res)=>{
    res.cookie("cookie_name" , 'cookie_value').send('')
})
router.post("/register", auth.register)
router.post("/login", auth.login)
router.post("/logout", auth.logout)


export default router