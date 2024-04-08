/*
 * Done By: Greg Postings ST10114245 
 * Module: APDS
 * Class: BCA3 G7
 * Task: POE Task 2
 * Start Date and Time: 20 September 2022 at 10:20
 * Finish Date and Time: 11 October 2022 at 12:35
 * 
 */


//----------------------------------------------------------------------------------//
//Imports / included items
const router = require('express').Router();
const {User, validateUser} = require('../models/user');
const {hashPassword} = require('../utils/hash');
const auth = require('../middleware/auth');

//const { check, validationResult } = require('express-validator');


//Satitization and validation

/*
var loginValidate = [
    // Check Username
    check('username').isLength({ min: 8 }).withMessage('Username Must Be at Least 8 Characters').isLength({ max: 50}).withMessage("Username cannot be longer than 50 characters").trim().escape(),

    // Check Password
    check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()
];*/
  






//----------------------------------------------------------------------------------//
//Create new user
router.post('/', async (req, res) => {
    //Checks if the users data is valid
    const {error} = validateUser(req.body);
    //If there is an error it will display a bad request error
    if (error) return res.status(400).json(error.details[0].message);

    const isUnique = (await User.count({ username: req.body.username})) === 0;
    //If the username is not unique
    if (!isUnique)
    //Resonds with a bad request error
    return res.status(400)
    //Genral error message - does not give specific information away to threats / prevents username harvesting
    .json({ error: 'The username or passord is incorrect'});

    try {
        //Creating a new user
        const user = new User(req.body);
        //Hashing the users password
        user.password = await hashPassword(user.password);
        //Saving the users information
        await user.save();
    } catch (err) {
        //Responds with an unknown server error
        return res.status(500).json(err);
    }
    //Responds with a created/ successful response
    res.sendStatus(201);
});


//----------------------------------------------------------------------------------//
//Get current user details
router.get('/', auth, async (req, res) => {
    res.send({ currentUser: req.user});
});

//Exporting the router functions as a module
//so that it can be used by other files
module.exports = router;

//--------------------------ooo000 END OF FILE 000ooo---------------------------//


//Original Code
/*
router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({username:req.body.username})
    .then(user => {

    })
    .then(result => {
        if(!result)
        {
            return res.status(401).json(
                {
                    message: "Authentication Failure"
                }
            );
        }

        const token = jwt.sign({username:fetchedUser.username, userid:fetchedUser._id},
            'secret_this_should_be_longer_than_it_is',
            {expiresIn: '1h'});

            res.status(200).json({token:token});
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication Failure"
            });
        });
    }); 

module.exports = router;
*/