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
const userSchema = mongoose.Schema(
    {
        //Giving the fields names and declaring their type for the MongoDB
        username: { type: String, unique: true },
        firstName: String,
        lastName: String,
        password: String
    }
);

//Setting the schema with the fields
const User = mongoose.model('User', userSchema);


//----------------------------------------------------------------------------------//
//Validating a user
function validateUser(user)
{
    const schema = Joi.object({
        //Setting requirements or validation criteria for each user input using Joi
        username: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        password: Joi.string().min(3).max(50).required(),
    });
    return schema.validate(user);
}

//Exporting the User model and the validateUser function
//as a module so that it can be used by other files
module.exports = { User, validateUser };

//--------------------------ooo000 END OF FILE 000ooo---------------------------//