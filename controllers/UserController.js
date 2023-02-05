const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')


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
        res.json(findUser);
    }else {
        throw new Error(`Invalid Credentials`);
    }
});


module.exports = {createUser, loginUser}
