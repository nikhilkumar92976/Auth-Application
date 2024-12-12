// Import express and router
const express = require('express');
const router = express.Router();

// Import controller
const { signup, login } = require('../controller/auth');
const {auth,isStudent,isAdmin} = require('../middleware/middleware');

// Routes
router.post('/signup', signup); 
router.post('/login', login);

// Testing Route for Middleware
router.get("/test", auth, (req,res) => {
    res.json({
        success: true,
        message: "Test successful"
    })
})

// Protected Route for Student
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Student"
    })
});

// Protected Route for Admin 
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Admin"
    })
});

module.exports = router;
