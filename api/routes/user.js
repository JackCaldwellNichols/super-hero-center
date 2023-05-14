const router = require('express').Router()
const User = require('../models/User.js')


//GET FAVOURITES

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const {password, ...others} = user
      res.status(200).json(others)
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });


//UPDATE PROFILE
router.put('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new:true})
            const {password, ...others} = updatedUser._doc
            res.status(200).json(others)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("Not authorised")
    }
})

//ADD TO FAVOURITE

router.put('/:id/add', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        if(!user.favourites.includes(req.params.id)){
            await user.updateOne({$push: {favourites: req.params.id}})
            res.status(200).json(user)
        }else{
            res.status(403).json("Already in your favourites!")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//UNFOLLOW A USER

router.put('/:id/unfavourite', async (req, res)=> {
  
        try {
            const currentUser = await User.findById(req.body.userId)
                if(currentUser.favourites.includes(req.params.id)){
                    await currentUser.updateOne({$pull: {favourites: req.params.id}})
                    res.status(200).json("Removed from your favourites")
                }else{
                    res.status(403).json("Not in your favourites")
                }
        } catch (error) {
            res.status(500).json(error)
        }
})


//DELETE PROFILE

router.delete('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("Not authorised")
    }
})


module.exports = router
