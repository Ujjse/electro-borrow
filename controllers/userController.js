const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Registration

const createUser = async (req,res) => {
    // checking incoming data
    console.log('Incoming request data:', req.body);

    // destrutciong the incoming data
    const {fname, lname, email, number, password, confirmpassword} = req.body;

    // validate
    if(!fname || !lname || !email || !password || !confirmpassword){
        console.log('Validation failed: Missing fields');
        return res.json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    if(password !== confirmpassword){
        console.log('Validation failed: Password do not match');
        return res.json({
            success: false,
            message: "Password doesn't match!"
        })
    }

    // error handling
    try{
        // checking if user is registered
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            console.log('Validation failed: User with this email already exists');
            return res.json({
                success:false,
                message: "User Already Exists!"
            });
        }

        // hashing pass
        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt );

        // if user is new
        const newUser = new userModel({
            fname,
            lname,
            email,
            number,
            password: hashedPassword
        });

        // save to db
        await newUser.save();

        // send res
        res.json({
            success: true,
            message: "User created successfully!"
        });
    }
    catch(error){
        console.log('Internal Server Error:', error);
        res.json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

// LOGIN

const loginUser = async (req, res) => {

    console.log(req.body)

    // Destructuring
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": " Please enter all fields!"
        })
    }

    // Try catch
    try {


        // Find user (email)
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.json({
                "success": false,
                "message": " User doesn't exist!"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)


        // password not valid (error)
        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": " {Password is wrong}!"
            })
        }
        const token = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET
        )

        res.json({
            "success": true,
            "message": "User Login Successful",
            "token": token,
            "userData": user
        })

    } catch (error) {
        console.log(error)
        return res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }
}

const updateInfo = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { fname, lname, number, email } = req.body;
  
      // Validate input data
      if (!fname || !lname || !number || !email) {
        return res.status(400).json({
          success: false,
          message: "All fields (fname, lname, number, email) are required!",
        });
      }
  
      // Update user info
      const updatedInfo = await userModel.findByIdAndUpdate(
        userId,
        { fname, lname, number, email },
        { new: true, runValidators: true }
      );
  
      if (!updatedInfo) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User information updated successfully!",
        data: updatedInfo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating user information.",
      });
    }
  };



module.exports={
    createUser,
    loginUser,
    updateInfo
}