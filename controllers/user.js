const userService = require('../services/user');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const User=require('../models/user');
require('dotenv').config();


  
const createUsertest = async (req, res) => {
  const {testAbout,testOn}=req.body;
  switch(testOn){
    case "name":
      return await userService.createUserTestName(testAbout).then(respond=>{
        if(respond==null){
          res.json({
            status:200,
            message:'free' 
        })
        }else{
          res.json({ 
            status:400,

            message:' no free' });
    
        }
      });
      case "email":
        return await userService.createUserTestEmail(testAbout).then(respond=>{
          if(respond==null){
            res.json({
              status:200,
              message:'free' 
            })
          }else{

            res.json({ 
              status:400,
              message:' no free' });
      
          }
        });
        // case "PhoneNumber":
        //   return await userService.createUserTestPhoneNumber(testAbout).then(respond=>{
        //     if(respond==null){
        //       res.json({
        //         status:200,
        //         message:'free' 
        //       })
        //     }else{
              
        //       res.json({ 
        //         status:400,
        //         message:' no free' });
        
        //     }
        //   });
      

  }
   
  
};
const createUser= async (req, res) => {
    return await userService.createUser(req.body.email,req.body.name,req.body.password,req.body.age,req.body.gander,req.body.isCoach,req.body.zoom_meetingNumber,req.body.zoom_meetingPassword,req.body.image).then((newUser)=>{
        if(newUser!=null)
        {
            res.json({
                status:200 
            })
        }
        else{
          res.json({
            status:400 
        })        }
    });
    
    // res.json(newUser);

};
const Signin=async (req, res) => {
   const {email,password}=req.body;
    return await userService.Signin(email).then((user)=>{
      console.log(user)

        if (!user) {
          return  res.json({
            status:404,
            message:'User not found'

        });
            // return res.status(404).json({ error: ['User not found'] });
        }
        if(!user.authenticate(password)){
        return  res.json({
          status:400,
          message:'Email and password do not matc'
      });
    }
        // return res.status(400).json({error:'Email and password do not match'});
    
        const token =jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    
        console.log(process.env.JWT_SECRET);
        res.cookie('token',token,{expiresIn:'1d'});
        return  res.json({
          status:200,
            token,user
        });
    });
    
    // res.json(user);
};
  const Signout= (req, res) => {

  res.clearCookie("token")
  return res.json({
      message:'signout success'
  });
};

const getUsers = async (req, res) => {
    const articles = await userService.getUsers();
    console.log("ddddd"+articles)
    res.json(articles);
};
// console.log(expressJwt.JWT_SECRET)

// module.exports.requireSignin=expressJwt({
//     secret: process.env.JWT_SECRET
// });


const getUser = async (req, res) => {
  console.log("getUserById")
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    

    res.json(user);
};
const getUserName = async (req, res) => {
  console.log("getUserById")
    const user = await User.findById(req.params.userId)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    

    res.json(user.name);
};
const updateUser= async (req, res) => {
   
    const user = await userService.updateUser(req.params.userId,req.body.email,req.body.name,req.body.phoneNumber,req.body.zoom_meetingNumber,req.body.zoom_meetingPassword,req.body.image);
    if (!user) {
      console.log("user not found")

      return res.status(404).json({ errors: ['user not found'] });
    }
  
    console.log("user upadate")
    res.json(user);
  };
  const updateImage= async (req, res) => {
   
    const user = await userService.updateUserImage(req.params.userId,req.body.imageUrl);
    if (!user) {
      console.log("user not found")

      return res.status(404).json({ errors: ['user not found'] });
    }
  
    console.log("user upadate")
    res.json(user);
  };

  const deleteUser= async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ errors: ['user not found'] });
    }
  
    res.send();
  };



  module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    Signin,
    Signout,
    createUsertest,
    updateImage,getUserName
  };