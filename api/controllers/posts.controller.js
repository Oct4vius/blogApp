import { db } from "../db.js";

export const getPosts = (req, res) =>{



    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?" 
    : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data)=>{
        if(err) return res.send(err);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) =>{
    const q = 'SELECT `username`, `title`, `description`, p.img, u.img AS userImage ,`cat`, `date` FROM users u JOIN posts p ON u.id = p.userId WHERE p.id = ?' 

    db.query(q, [req.params.id], (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0]);
    })

}

export const addPost = (req, res) =>{
    res.json('From a controller waazaaaa')
}

export const deletePost = (req, res) =>{
    // const token = req.cookies.access_token
    // if(!token) return res.status(401).json("No auntenticado")

    // jwt.verify(token,"holacomoesta", (err, userInfo)=>{
    //     if(err) return res.status(403).json("El token no es valido")

    //     const postId = req.params.id
    //     const q = 'DELETE FROM posts WHERE `id` = ? AND `userId` = ?'

    //     db.query(q, [postId, userInfo.id], (err, data)=>{
    //         if(err) return res.status(403).json("Solo puede borrar tus publicaciones")

    //         return res.json("Publicion borrada")
    //     })
    // } )
}

export const updatePost = (req, res) =>{
    res.json('From a controller waazaaaa')
}