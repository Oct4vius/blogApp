import express from 'express';
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import postsRoutes from './routes/posts.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Cambia esto al dominio correcto desde el que se realizarán las solicitudes
    credentials: true, // Habilita el envío de cookies y otros datos de autenticación
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({storage})

app.post('/api/uploads', upload.single('file'), function (req, res){
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)

app.listen(8800, ()=>{
    console.log("Connected!")
})