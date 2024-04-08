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
const jwt = require('jsonwebtoken');


//----------------------------------------------------------------------------------//
//This is to authenticate the token
function auth(req, res, next) {
    //Constanct value that is limited to this block of code
    const token = req.header('x-auth-token');
    //ID that is limited to this block of code
    let id;

    try{
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        id = userId;
    } catch (err) {
        //Sends an unauthorized message
        return res.sendStatus(401);
    }

    if (id) {
        req.user = { id };
        return next();
    }

    //Sends an unauthorized message
    res.sendStatus(401);
}

//Exporting the auth function as a module
//so that it can be used by other files
module.exports = auth;

//--------------------------ooo000 END OF FILE 000ooo---------------------------//