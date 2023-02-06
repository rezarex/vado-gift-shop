const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/auth');


const createUser = asyncHandler(async(req, res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email})
    if(!findUser){
        //create new user
        const newUser = User.create(req.body)
        res.json(newUser);
    } else {
        //user exists
      throw new Error(`User Already Exists`)
    }
});

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    //check if user exists
    const findUser = await User.findOne({email})
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser.mobile,
                token: generateToken(findUser?.id)            
            });
    }else {
        throw new Error(`Invalid Credentials`);
    }
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    }catch (err) {
        throw new Error(err)
    }
});

//get single user
const getSingleUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const getUser = await User.findById(id);
        res.json(getUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true
        });
        res.json(updateUser);
        
    } catch (error) {
        throw new Error(error);
        
    }
});


module.exports = {createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser}
