async function login() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const res = await fetch("http://localhost:8080/api/auth/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
username,
password
})

})

const data = await res.json()

console.log(data)

if(data.token){

localStorage.setItem("token", data.token)

window.location.href = "/Feedback-app/public/pages/feedback.html"

}else{

alert(data.message)

}

}


async function register(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const res = await fetch("http://localhost:8080/api/auth/register", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
username,
password
})

})

const data = await res.json()

window.location.href = "/Feedback-app/public/pages/login.html"

}
