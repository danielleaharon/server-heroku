const User = require('../models/devices');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
require('dotenv').config();



const createUser = async (email,name,password,PhoneNumber,isCoach,zoom_meetingNumber,zoom_meetingPassword,image) => {
    console.log("createUser")
    const user = new User({
        email : email,
        name: name,
        username:email,
        password:password,
        PhoneNumber:PhoneNumber,
        isCoach:isCoach,
        zoom_meetingNumber:zoom_meetingNumber,
        zoom_meetingPassword:zoom_meetingPassword,
        image:image,

    });

    return await user.save();
};
const Signin= async (email) => {

    const user= await User.findOne({email});
  
    console.log("user:"+user);
    return await user;
     
};

const getUserById = async (id) => {
  
    return await User.findById(id);
};


const getUsers = async () => {
    return await User.find({});
};

const updateUser = async (id,email,name,password,phoneNumber,isCoach,zoom_meetingNumber,zoom_meetingPassword,image) => {
    const user = await findOne(id);
    if (!user)
        return null;

    user.email = email;
    user.name=name;
    user.username=email,
    user.password=password,
    user.phoneNumber=phoneNumber,
    user.isCoach=isCoach,
    user.zoom_meetingNumber=zoom_meetingNumber,
    user. zoom_meetingPassword=zoom_meetingPassword,
    user.image=image,
    await user.save();
    return user;
};

const deleteUser= async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    await user.remove();
    return user;
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    Signin,
    createUserTestName,
    createUserTestEmail,
    createUserTestPhoneNumber
}