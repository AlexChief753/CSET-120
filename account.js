function myfunction() {
    let length = document.getElementById("form").childElementCount;
    let account = "";
    for(let i=0; i<length; i++) { // Iterates through all children of form div
        if (i%2===1) { // This conditional selects input boxes and not labels
            if (i<5) {// Conditional to select first two input boxes
                if (document.getElementById("form").children[i].value.length > 1) {
                    // Conditional that ensures names are at least 2 characters
                    console.log("name" + document.getElementById("form").children[i].value);
                }
            }
            let info = [];
            if (document.getElementById("form").children[i].value.length > 1) {
                // This conditional verifies that the inputs have at least two characters
                console.log(document.getElementById("form").children[i].value);
            }
            else {
                // Highlight text box that triggered this event
                console.log("All fields ");
            }
        }
    }
}
function fun() {
    console.log("");
}

// Store account info in an array
// Push info to local storage with email as key and array as value
// Make local storage accessible to mutliple pages?


// For Loop to iterate through all children of the form div
// Conditional that first specifies only the text input boxes
// Then checks field lengths of required text box fields
// Then differentiate between email and not email to make email the key (of key/value pair)