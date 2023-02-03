const id = await fetch("http://localhost:5678/api/users/login", {
  body: '{"email": "sophie.bluel@test.tld", "password": "S0phie"}',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method: "POST"
}) 
.then(response => response.json())

console.log(id)




document.getElementById("login").addEventListener("click", function(event){
  event.preventDefault()
});

console.log

/*

async function loginForm(e){
  e.preventDefault()
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  remplacer les logs par un lien vers les input value 

  const id = await fetch("http://localhost:5678/api/users/login", {
    body: '{"email": "sophie.bluel@test.tld", "password": "S0phie"}',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  }) 
  .then(response => response.json())

    if(response.status == 200) {
        console.log(username + "is logged in")
        return
      }
    console.log("incorrect")
    const alert = document.querySelector(".alert");
    alert.style.display = "inline";

}


const token = id.token
localStorage.setItem('token', token) */