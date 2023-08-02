import express from 'express';
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import postsRoutes from './routes/posts.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

const app = express();



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8800');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/auth', authRoutes)

app.listen(8800, ()=>{
    console.log("Connected!")
})