 import express from 'express';  //for importing modules we add type: module in package.json
 import mongoose from 'mongoose';
 import dotenv from 'dotenv';
 import userRouter from './routes/user.route.js'; 
 import authRouter from './routes/auth.route.js';
 import cookieParser from 'cookie-parser';

 dotenv.config({ path: './api/.env' }); //for not writing path: './api/.env' just relocate the environment varible to the root node ie the uppermost level where package.json is residing  //dotenv is used to hide the password and username of the database
 

 mongoose.connect(process.env.YoPrivacy).then(()=>{  //YoPrivacy is the name of the database
       console.log('Connected to MongoDB!')  //if the connection is successful
    } ).catch((error)=>{  //if the connection is unsuccessful
        console.log('Error:',error.message)
    });
 const app = express(); //express js
 app.use(express.json()); //so that we can use json data in the server 
  app.use(cookieParser());  //to use cookies in the server
 app.listen(3000,()=>{
    console.log('Server is running on port 3000!') //port number doesnt matter 4000 5000 bhi chalta  //bar bar node ap/index.js na karna pade changes dekhne kain  liye isiliye humne npm i nodemon install kiya aur package.json mai dev mai likhdiya aur wha render(deployment) kai liye start bhi likh diya
 }
);

app.use("/api/user",userRouter);  //userRouter is the router we created in user.route.js file 
app.use("/api/auth",authRouter);  //authRouter is the router we created in auth.route.js file

app.use((error,req,res,next)=>{  //error handling middleware)
  const statusCode = error.statusCode || 500; //if the status code is not there then it will be 500
  const message = error.message || 'Internal Server Error'; //if the message is not there then it will be Internal Server Error
  return res.status(statusCode).json({
      success: false,     //will be used in code in the signup.jsx file and many other filesto check if the request is successful or not
      statusCode,        // we can also write statusCode:statusCode but in ES6 we can write it like this when varibale and key have same name
      message,         // we can also write message:message
  });
});