import express from 'express';
import { Signup, Login , getUserProfile} from "../Controllers/userContoller.js";
import {protect} from '../middleware/auth.js';


const router = express.Router();

// Define the routes
router.post('/signup', Signup);  
router.post("/login", Login);
router.get("/me", protect, getUserProfile);


export default router;
