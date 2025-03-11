import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/* router.get("/checkAuthetication", verifyToken, (req,res,next)=>{
    res.send("hello user, you are logged in")
})
router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("hello user, you are logged in and can delete ur account")
})
router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("hello admin, you are logged in and u can do admin stuff!")
})
 */
//update
router.put("/:id",verifyUser ,updateUser)
//delete
router.delete("/:id",verifyUser, deleteUser)
//get
router.get("/:id",verifyUser, getUser)
//get all
router.get("/",verifyAdmin, getAllUsers)

export default router