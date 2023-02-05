const User = require('../models/UserModel')

const createUser = async(req, res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email})
    if(!findUser){
        //create new user
        const newUser = User.create(req.body)
        res.json({newUser});
    } else {
        //user exists
        res.json({
            msg: "User Exists",
            success: false
        })
    }
}


module.exports = {createUser}
