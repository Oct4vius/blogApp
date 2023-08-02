import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = (req, res) =>{

    //VER SI YA EXISTE EL USARIO

    const {email, username, password} = req.body;

    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [email, username], (err, data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("El usuario ya existe.")

        //Encripta la contraseña y crea un nuevo usuario

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)"
        const values = [
            username,
            email,
            hash
        ]

        db.query(q, [values], (err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json('User has been created.')
        });
    })


}

export const login = (req, res) =>{
    //VER SI EL USUARIO EXISTE

    const {username} = req.body;


    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [username], (err, data)=>{

        res.header('Access-Control-Allow-Credentials', true);
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("El usuario no fue encontrado.");
        
        //Verificar Contraseña

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );
        if(!isPasswordCorrect) return res.status(400).json("Usuario o Contraseña incorrecta.");

        const token = jwt.sign({id: data[0].id}, "holacomoesta")
        const {password, ...other} = data[0]

        res.cookie("access_token", token).status(200).json(other).send();

        console.log(token)
    });
}

export const logout = (req, res) =>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure: true
    }).status(200).json('User has been logged out')
}