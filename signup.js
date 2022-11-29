    let form = document.getElementById("form");
    let length = document.getElementById("form").childElementCount;
function signUp() {
    let userEmail = "";
    let infoArray =[];
    let status = true;
    let managerStatus = false;
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
        console.log(userEmail);
        console.log(infoArray);   
        localStorage.setItem(userEmail, infoArray);
        // window.location.href = "";
    }
}

// function logIn(){
//     if(.children[1].value === "gustavo" && form.children[3].value === "venganza"){
//         console.log("Manager Login Successful.")
//         managerStatus = true;
//         // window.location.href ="";
//     }
// }




localStorage.setItem("gustavo", "venganza");