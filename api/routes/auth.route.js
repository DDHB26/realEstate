import express from 'express';
import { google, signin, signup,signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up',signup); // signup comes from the auth.controller.js
router.post('/sign-in',signin); 
router.post('/google',google);
router.get('/signout',signOut); //as we are not sending any data to the server so we are using get method
export default router; 