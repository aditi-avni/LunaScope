
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        if (typeof email !== 'string' ||
            typeof password !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({
                message: 'Enter a valid email and password'
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must contain at least 8 characters'
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const existingUser = await User.findOne({
            email: normalizedEmail
        })

        if (existingUser) {
            return res.status(409).json({
                message: 'An account with this email already exists'
            })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await User.create({
            email: normalizedEmail,
            passwordHash
        })

        res.status(201).json({
            message: 'Account created successfully',
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: 'An account with this email already exists'
            })
        }

        console.error('Registration failed:', err.message)
        res.status(500).json({
            message: 'Unable to register user'
        })
    }
})

// Log in an existing user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        })

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured')
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        console.error('Login failed:', err.message)
        res.status(500).json({
            message: 'Unable to log in'
        })
    }
})

module.exports = router
