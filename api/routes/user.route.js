import express from 'express';
import { deleteUser, test,updateUser } from '../controllers/user.controller.js'; //importing karte waqt humne user.controller.js file mai jo function banaya tha uska naam test tha usko humne import kiya aur .js lagana mat bhulna
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();  

router.get('/test',  test);  //router.get is used to get the data from the server and test is the function we created in user.controller.js file to get the data from the server     
router.post('/update/:id', verifyToken, updateUser ); //id is used to differentiate between many users and to update particular user and updateUser is the function we created in user.controller.js file to update the user     
router.delete('/delete/:id', verifyToken, deleteUser );          
 


export default router;  //exporting the router to use it in the index.js file  