/*

Email validation with Node JS
Simple demo which passes email address to the API and shows a message based on response.

Including showing alternative suggestions for common typos such as gamil.com instead of gmail.com

Full email validation API documentation:-
https://developers.alliescomputing.com/postcoder-web-api/email-validation

*/

// Using a simplified HTTP client from NPM - https://github.com/request/request
var request = require('request');

// Going to grab the arg from the command line arguments for this example
var email_address = process.argv[2] || "";
    
// Replace with your API key, test key will always return true regardless of email address
var api_key = "PCW45-12345-12345-1234X";

// Grab the input text and trim any whitespace
email_address = email_address.trim() || "";

// Create an empty output object
var output = new Object;

if (email_address == "") {

    // Respond without calling API if no email address supplied
    output.valid = false;
    output.score = 0;
    output.message = "No email supplied";

    console.log(output);

} else {

    // Create the URL including API key and encoded email address
    var email_url = "https://ws.postcoder.com/pcw/" + api_key + "/emailaddress/" + encodeURIComponent(email_address);

    // Call the API
    request(email_url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // Convert response into a JSON object
            var email_response = JSON.parse(body);
            
            // Check for alternative email address suggestion
            if (email_response.alternative) {

                output.valid = email_response.valid;
                output.score = email_response.score;
                output.message =  "Did you mean: " + email_response.alternative;
                
            } else {
                
                if(email_response.valid === true) {
                    
                    // Do something if valid, here we will output the response
                    
                    output.valid = email_response.valid;
                    output.score = email_response.score;
                    output.message = email_response.state;
                    
                } else {
                    
                    // Do something if invalid, here we will output the response
                    
                    output.valid = email_response.valid;
                    output.score = email_response.score;
                    output.message = email_response.state;
                
                }

                // Note: If "score" is less 100, it may be a generic sales@ mailbox, disposable email address or a catch all server
                // More info - https://www.alliescomputing.com/support/validating-email-addresses

                // Full list of "state" responses - https://developers.alliescomputing.com/postcoder-web-api/email-validation
                
            } 

            console.log(output);

        } else {

            output.message = "An error occurred" + response.statusCode;

            console.log(output);

            // Triggered if API does not return HTTP code between 200 and 399
            // More info - https://developers.alliescomputing.com/postcoder-web-api/error-handling

        }

    });

}
