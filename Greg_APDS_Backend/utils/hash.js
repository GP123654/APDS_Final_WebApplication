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
const bcrypt = require('bcrypt');


//----------------------------------------------------------------------------------//
//Hashing the users password
async function hashPassword(password) {
    //Adding salt
    const salt = await bcrypt.genSalt(10);
    //Hashing the password and adding the salt
    const hashedPassword = bcrypt.hash(password, salt);
    //Returns the hashed password
    return hashedPassword;
}


//----------------------------------------------------------------------------------//
//Checking to see if the password is valid
async function isValidPassword(password, hash) {
    //Compares the password and the hashed password
    return await bcrypt.compare(password, hash);
}

//Exporting the hashPassword and isValidatePassword functions
//as a module so that it can be used by other files
module.exports = { hashPassword, isValidPassword };

//--------------------------ooo000 END OF FILE 000ooo---------------------------//