function signUp() {
    let length = document.getElementById("form").childElementCount;
    let infoArray =[];
    let userEmail = "";
    for(let i=0; i<length; i++) {
        if (i%2===1) {
            if (i===1) {
                if (document.getElementById("form").children[i].value.length > 4) {
                    userEmail = document.getElementById("form").children[i].value;
                }
                else {
                    console.log("Email too short");
                }
            }
            else if (i>4 && i<8) {
                if (document.getElementById("form").children[i].value.length > 1) {
                    infoArray.push(document.getElementById("form").children[i].value);
                }
                else {
                    console.log(`${i} is not long enough.`)
                }            
            } 
            else if (i>8) {
                if (document.getElementById("form").children[i].value.length > 4) {
                    infoArray.push(document.getElementById("form").children[i].value);
                }
                else {
                    console.log(`${i} is not long enough.`)
                }          
            }
        }
    }
    // localStorage.setItem(userEmail, infoArray);
    // Redirect to landing page here
    // window.location.href = "";
}

function logIn(){
    console.log(localStorage.getItem(document.getElementById("usernameLogIn").value));
    if (document.getElementById("usernameLogIn").value === "gustavo" && document.getElementById("passwordLogIn").value === "venganza"){
        console.log("Manager Login Successful");
        // window.location.href = "";
    }
    else {
        console.log(localStorage.getItem(document.getElementById("usernameLogIn").value));
    }
}

localStorage.setItem("gustavo", "venganza");
// username: adlowe221@stevenscollege.edu
// Password: Password
