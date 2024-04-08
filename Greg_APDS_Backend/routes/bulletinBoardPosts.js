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
const auth = require('../middleware/auth');
const { BulletinBoardPost, validatePost} = require('../models/bulletinBoardPost');


//----------------------------------------------------------------------------------//
//Gets/Retrieves all the bulletin board posts
router.get('/', auth, async (req, res) => {
    //Finds all the bulletinboard posts
    const bulletinBoardPost = await BulletinBoardPost.find();
    //Responds by displaying all the bulletinboard posts
    res.send(bulletinBoardPost);
});


//----------------------------------------------------------------------------------//
//Creates a new bulletin board post
router.post('/', auth, async (req, res) => {
    //Checks to see if the data is valid
    const { error } = validatePost(req.body);
    //If there is an error it will display a bad request error
    if (error) return res.status(400).json(error.details[0].message);

/*
    const isUnique = (await User.count({ username: req.body.username})) === 0;
    if (!isUnique)
    return res
    .status(400)
    //Genral error message - does not give specific information away to threats
    .json({ error: 'The username or passord is incorrect'});
    

    try {
        const post = new BulletinBoardPost(req.body);       
        post.save();
    } catch (err) {
        return res.status(500).json(err);
    }
    const post = new BulletinBoardPost(req.body); 
    */
    
    const bulletinBoardPost = new BulletinBoardPost(req.body);
    //Saves the bulletinboard post
    bulletinBoardPost.save();
    //Responds by displaying the bulletinboard post
    res.send(bulletinBoardPost);
});


//----------------------------------------------------------------------------------//
//Gets/Retrieves one bulletin board posts
router.get('/:id', auth, async (req, res) => {
    //Finds the bulletinboard post using its id
    const bulletinBoardPost = await BulletinBoardPost.findById(req.params.id);
    //Responds by displaying the bulletinboard post if there is one
    if (bulletinBoardPost) return res.send(bulletinBoardPost);
    //Responds with a page not found error
    res.sendStatus(404);
});


//----------------------------------------------------------------------------------//
//Deletes one bulletin board posts
router.delete('/:id', auth, async (req, res) => {
    //Deletes the bulletinboard post using its id
    const result = await BulletinBoardPost.deleteOne({ _id: req.params.id });
    //Responds by displaying the result
    res.send(result);
});

//Exporting the router functions as a module
//so that it can be used by other files
module.exports = router;

//--------------------------ooo000 END OF FILE 000ooo---------------------------//