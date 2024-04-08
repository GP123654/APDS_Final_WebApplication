/*
 * Done By: Greg Postings ST10114245 
 * Module: APDS
 * Class: BCA3 G7
 * Task: POE Task 2
 * Start Date and Time: 20 September 2022 at 10:20
 * Finish Date and Time: 11 October 2022 at 12:35
 * 
 */


//Checking the user authentication details

//----------------------------------------------------------------------------------//
//Imports / included items
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { isValidPassword } = require('../utils/hash');
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

//----------------------------------------------------------------------------------//
//Login route
router.post('/', bruteforce.prevent, async (req, res) => {
    //Checking the users username
    const user = await User.findOne({ username: req.body.username });
    //If it is not a user
    if (!user)
    {
        //Give a general error message, which is better for security
        return res.status(401).json({ error: 'Incorrect username or password' });
    }

    //Checking the users password
    const valid = await isValidPassword(req.body.password, user.password);
    //If it is not valid
    if(!valid)
    {
        //Give a general error message, which is better for security
        return res.status(401).json({ error: 'Incorrect username or password' });
    }

    //Creates and displays the token and it expires in an hour so you will have to reauthenticate to prevent unwanted people having unlimited time to use the application
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    res.send({ token });
});

//Exporting the router functions as a module
//so that it can be used by other files
module.exports = router;

//--------------------------ooo000 END OF FILE 000ooo---------------------------//