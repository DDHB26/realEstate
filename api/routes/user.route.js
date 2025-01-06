import express from 'express';
import { test } from '../controllers/user.controller.js'; //importing karte waqt humne user.controller.js file mai jo function banaya tha uska naam test tha usko humne import kiya aur .js lagana mat bhulna

const router = express.Router();  

router.get('/test',  test);  //router.get is used to get the data from the server and test is the function we created in user.controller.js file to get the data from the server                           
 


export default router;  //exporting the router to use it in the index.js file  