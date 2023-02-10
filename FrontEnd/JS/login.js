let usernameInput = document.getElementById("username").value
let passwordInput = document.getElementById("password").value

const token =  window.sessionStorage.getItem("token");

document.getElementById('logout-button').style.display = 'none'; 

document.getElementById("login").addEventListener("click", async function(event){
  event.preventDefault()

// TODO username & password input value sur le fetch

  const id = await fetch("http://localhost:5678/api/users/login", {
    body: '{"email": "sophie.bluel@test.tld", "password": "S0phie"}',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  }) 
  .then(response => response.json())

    if (id.userId === 1) {
        console.log("is logged in");
       window.location.href = "/FrontEnd/index.html";
       const token = id.token;
       window.sessionStorage.setItem("token", token);
      }
      else {
    const alert = document.querySelector(".alert");
    alert.style.display = "inline";
      }
});
