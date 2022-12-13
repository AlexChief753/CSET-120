let form = document.body.getElementsByClassName("form")[0];
console.log(form);
let logInDiv = document.getElementById("logInDiv");

function signUp() {
    let length = form.childElementCount;
    let userEmail = "";
    let infoArray =[];
    let status = true;
    for(let i=0; i<length; i++){
        if(i%2===1){
            if (i<10 && form.children[i].value.length <= 3){
                alert(`${form.children[i-1].innerHTML.replace(":", "")} is too short. Please use a minimum of 4 characters.`);
                status = false;
            }
            if (i===1){
                if (localStorage.getItem(form.children[i].value) !== null){
                    alert("This email is associated existing account. Please use a different email or try logging in.");
                    status = false;
                }
                else{
                    userEmail = form.children[i].value;
                }
            }
            if (i!==1){
                infoArray.push(form.children[i].value);
            }
        }
    }
    if(status === true) {
        localStorage.setItem(userEmail, JSON.stringify(infoArray));
        sessionStorage.setItem("manager", "false");
        window.location.href = "MenuPage.html";
    }
}

function logIn(){
    // console.log(JSON.parse(localStorage.getItem(logInDiv.children[1].value))[0]);    
    if(logInDiv.children[1].value === "gustavo" && logInDiv.children[3].value === "fring"){
        sessionStorage.setItem("manager", "true");
        alert("Manager login successful. Entering menu edit mode.");
        window.location.href ="MenuPage.html";
    }
    else if (JSON.parse(localStorage.getItem(logInDiv.children[1].value)) == null){
        alert("Account does not exist.");
    }
    else if (JSON.parse(localStorage.getItem(logInDiv.children[1].value)) !==null && JSON.parse(localStorage.getItem(logInDiv.children[1].value))[0] !== logInDiv.children[3].value){
        alert("Incorrect Password.");
    }
    else if (JSON.parse(localStorage.getItem(logInDiv.children[1].value))[0] == logInDiv.children[3].value){
        sessionStorage.setItem("manager", "false");
        window.location.href = "MenuPage.html";
    }
}

// Order now button - disable manager edit mode -------------------------------
function order_now_nav_button() {
    sessionStorage.setItem("manager", false);
    window.location.href = "MenuPage.html";
}