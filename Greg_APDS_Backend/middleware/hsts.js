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
//Transport security between transmission
function hsts(req, res, next) {
    //If the request is secure
    if (req.secure) {
        //Setting the header to be used
        res.setHeader(
            //protocol to force https
            'Strict-Transport-Security',
            'max-age=31536000, includeSubDomains; preload'
        );
    }
    next();
}

//Exporting the hsts function as a module
//so that it can be used by other files
module.exports = hsts;

//--------------------------ooo000 END OF FILE 000ooo---------------------------//