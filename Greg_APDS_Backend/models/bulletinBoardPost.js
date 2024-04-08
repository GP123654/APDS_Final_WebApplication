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
const mongoose = require('mongoose');
const Joi = require('joi');


//----------------------------------------------------------------------------------//
//Creating the schema for the billboard posts
const postschema = new mongoose.Schema(
    {
        //Giving the fields names and declaring their type for the MongoDB
        title: String,
        description: String,
        departmentCode: String,
    }
);

//Setting the schema with the fields
const BulletinBoardPost = mongoose.model('BulletinBoardPost', postschema);


//----------------------------------------------------------------------------------//
//Validating a bulletinboard post
function validatePost(bulletinBoardPost) {
    //Setting requirements or validation criteria for each user input using Joi
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(50).required(),
        departmentCode: Joi.string().min(3).max(50).required(),
    });
    return schema.validate(bulletinBoardPost);
}

//Exporting the BulletinBoardPost model and the validatePost function
//as a module so that it can be used by other files
module.exports = { BulletinBoardPost, validatePost };

//--------------------------ooo000 END OF FILE 000ooo---------------------------//