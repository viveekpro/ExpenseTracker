const express = require("express");
const {
    register, 
    login,
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/authController")

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes 
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);




module.exports = router;