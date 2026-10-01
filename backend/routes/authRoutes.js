const express = require("express");
const {
    register, 
    login,
    getProfile,
    updateProfile,
    changePassword,
    getSecurityQuestion,
    verifySecurityAnswer,
    resetPassword
} = require("../controllers/authController")

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes 
router.post('/register', register);
router.post('/login', login);

// Forgot Password
router.post("/forgot-password/question",
    getSecurityQuestion
);
router.post(
    "/forgot-password/verify",
    verifySecurityAnswer
);
router.post(
    "/forgot-password/reset",
    resetPassword
)

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);




module.exports = router;