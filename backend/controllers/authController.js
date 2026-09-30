const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// generate jwt
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// register
const register = async (req, res) => {
  try {
    const { name, email, password, securityQuestion, securityAnswer } = req.body;
    if (!name || !email || !password || !securityQuestion || !securityAnswer) {
      return res.status(400).json({
        message: "Name, email, password , security question and security answer are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if(securityAnswer.trim().length<2){
      return res.status(400).json({
        message: "Security answer must be at least 2 characters"
      });
    }

    const exitingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (exitingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer.trim().toLowerCase(), 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      securityQuestion,
      securityAnswer: hashedSecurityAnswer
    });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({
        message: "invalid email and password ",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: " invalid email or password",
      });
    }
    const token = generateToken(user._id);
    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message,
    });
  }
};

// update profile 
const updateProfile = async(req, res)=>{
try{
  const {name, email, profileImage } = req.body;
  const user = await User.findById(req.user.userId);
  if(!user){
    return res.status(404).json({
      message:"User not found"
    });
  }
  if(name){
    user.name = name;
  }
  if(email){
    const exitingUser = await User.findOne({
      email:email.toLowerCase(),
      _id: {$ne:user._id}
    });

    if (exitingUser){
      return res.status(400).json({
        message:"Email already in use"
      });
    }
    user.email = email.toLowerCase();
  }
  if(profileImage !== undefined){
    user.profileImage = profileImage;
  } 
  await user.save();
  res.status(200).json({
    message: "Profile updated successfully",
    user:{
      id:user._id,
      name: user.name,
      email:user.email,
      profileImage: user.profileImage
    }
  });

}catch(error){
 res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
}
};

const changePassword = async(req,res)=>{
try{
  const {
    currentPassword,
    newPassword
  } = req.body;
  
  if(!currentPassword || !newPassword){
    return res.status(400).json({
      message: "Current and new password are required"
    });
  }
  if(newPassword.length<6){
    return res.status(400).json({
      message:"New password must be at least 6 charactors"
    });
  }
  const user = await User.findById(req.user.userId);
  if(!user){
    return res.status(404).json({
      message:"User not found"
    });
  }
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({
      message: "Current paasword is incorrect"
    });
  }
  user.password = await bcrypt.hash(
    newPassword,
    10
  );
  await user.save();
  res.status(200).json({
    message:"Password Changed successfully"
  });

}catch(error){
 res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
}


};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};
