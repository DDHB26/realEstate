import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,createListing); // createlisting comes from the listing.controller.js

export default router;  //exporting the router to use it in the index.js file