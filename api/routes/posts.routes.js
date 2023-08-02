import { Router } from "express";
import * as post from '../controllers/posts.controller.js'



const router = Router()

router.get("/", post.getPosts)
router.get("/:id", post.getPost)
router.post("/", post.addPost)
router.delete("/:id", post.deletePost)
router.patch("/:id", post.updatePost)




export default router