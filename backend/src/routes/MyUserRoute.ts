import express from "express"
import MyUserController from "../controllers/MyUserController.js";
import jwtCheck from "../middleware/auth.js";



const router = express.Router()


router.post("/" , jwtCheck ,MyUserController.createCurrentUser);
router.put("/" , MyUserController.updateCurrentUser)



export default router;