import bcryptjs from 'bcryptjs';
import User from '../MODELS/user.model.js';
import { errorHandler } from '../utils/error.js';


export const test = (req, res) => { //req is request from the browser and res is response to the browser
    res.json({
        message: 'Test Successfull',
    });
};

export const updateUser = async (req, res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, 'First Sign-in Then Update Pyare-Lal')); //bhaisaab _id tha isiliye itni der se error hie aaye jara tha update karna mai it is only id
    try {
        if(req.body.password){
           req.body.password =bcryptjs.hashSync(req.body.password, 10); //if the user is updating the password then we will hash the password
        }
  
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {   //dont put $set: req.body directly because it can also update isAdmin and other things that which can lead to hacking
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
               avatar: req.body.avatar, 
            }    //we use set to update the things user want to update ie not all the things such as user want to update name but not email then we will update only name
        },{new:true}); //new:true is used to save the updated user with the new information

        const { password, ...rest } = updatedUser._doc; //we are not sending password to the user so we are destructuring it from the updatedUser._doc

        res.status(200).json(rest); //we are sending the updated user information to the user
        
    } catch (error) {
        next(error)
    }


}

export const deleteUser= async (req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only delete your own aacount! "))     //params id is ehat we are getting from /delete/:id and user.id is what we are getting from verifyUser.js

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}



    