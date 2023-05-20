const router = require('express').Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//REGISTER
router.post('/register', async (req, res) => {
    if(!req.body){
        res.status(400).json('Fields are empty')
    }
    const emailToLower = req.body.email.toLowerCase()
    const userExists = await User.findOne({email: emailToLower})
        if(userExists){
            res.status(400).json('User already exists')
        }
    const passwordCheck = req.body.password 
        if(passwordCheck.length < 6){
            res.status(400).json("Password  must contain more than 6 characters")
        }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword

    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})



//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json("No user found")
        }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCheck){
            return res.status(400).json('Incorrect username or password')
        }
        
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router



