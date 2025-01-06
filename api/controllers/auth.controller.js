import User from "../MODELS/user.model.js";
import bcryptjs from "bcryptjs";        //bcryptjs is used to hash the password
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";  //jwt is used to create the token that will be used to authenticate the user in the server

export const signup = async(req, res,next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12);  //password is hashed here //12 is the number of rounds of hashing // we can also do const hashedPassword= bcryptjs.hashSync(password, 12); //this is synchronous way of hashing the password
    const newUser = new User({ username, email, password: hashedPassword }); //we are creating a new user here //passwrod ki jagah hashedPassword dal dete hai Monodb mai
    try {
        await newUser.save(); //we use await because it saves the data in the database and it takes some time to save the data in the database and till that time next line of code will not execute
        res.status(201).json( "User created successfully") //201 is the status code for  something is created
    } catch (error) {
          next(error); //if there is an error then it will go to the error handling middleware
    }
 
};


export const signin = async(req, res,next) => {
    const { email, password } = req.body;
    try {
       const validUser = await User.findOne({ email }); 
       if (!validUser) return next(errorHandler(404,'User Nahi Bhetla')); //here we use our custom created errorHandler function that we created in the error.js file inn utils folder  //404 is the status code and User not found! is the message
       const validPassword = await bcryptjs.compare(password, validUser.password); 
       if (!validPassword) return next(errorHandler(401,'Sahi Sahi dal re sabh kuch')); //if the password is incorrect then it will show the error message
       const token = jwt.sign({ id : validUser._id }, process.env.JWT_SECRET);               //we are creating the token here //validUser._id is the id in mongodb for each user it is unique and it is given by mongodb //process.env.JWT_SECRET is the secret key that we are using to create the token
       const { password:pass, ...rest} = validUser._doc;                                     //here first the password:pass is used to hide the password from the user and then ...rest is used to get the rest of the data from the user and in that validUser._doc , .doc ensures removal of password from the user so the user will get all the data except the password
       res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest)      //we are setting the token in the cookie //httpOnly is used to make the cookie secure and it is not accessible to any third party and it is only accessible to the server
    } catch (error) {
        next(error); //if there is an error then it will go to the error handling middleware created in the index.js file
    }
}

export const google = async(req, res,next) => {
   try {
     const user = await User.findOne({ email: req.body.email }); 
       if(user){   //if user exist that is the sign in process
            const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET); 
            const { password:pass, ...rest} = user._doc; 
            res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest)
       }
         else{  //if user does not exist then the sign up process
             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
             const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
             const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
             await newUser.save();
                const token = jwt.sign({ id : newUser._id }, process.env.JWT_SECRET);
                const { password:pass, ...rest} = newUser._doc;
                res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest)
         }
   } catch (error) {
     next(error);
   }
}

