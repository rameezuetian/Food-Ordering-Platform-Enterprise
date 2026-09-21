import express from "express"
import MyUserController from "../controllers/MyUserController.js";

const router = express.Router()


router.post("/" , MyUserController.createCurrentUser);



export default router;