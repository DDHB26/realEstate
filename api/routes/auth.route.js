import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up',signup); // signup comes from the auth.controller.js
router.post('/sign-in',signin); 
router.post('/google',google);

export default router; 