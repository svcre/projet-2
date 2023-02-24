// recupération token

const token = window.sessionStorage.getItem("token");


// contenu connecté/déconnecté

let hiddenElements = document.querySelectorAll(".modifier");

if (token !== null) {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('logout-button').style.display = 'inline';
    hiddenElements.forEach(hiddenElements => hiddenElements.style.display = "inline");
    document.querySelector(".bande-edition").style.display = "flex";

} else {
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('login-button').style.display = 'inline';
    hiddenElements.forEach(hiddenElements => hiddenElements.style.display = "none");
    document.querySelector(".bande-edition").style.display = "none";


}

//suppression du token à la déconnexion

document.getElementById("logout-button").addEventListener("click", async function() {
    window.sessionStorage.removeItem("token");
})

// ..........................................................

// générer galerie img + titres

let projets = [];
async function fetchProjets() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => (projets = data));
    generateGallery(projets)
}

function generateGallery(projets) {
    for (let i = 0; i < projets.length; i++) {
        const item = projets[i];

        const sectionItem = document.querySelector(".ficheGalerie");
        const itemElement = document.createElement("item");

        const titleItem = document.createElement("h3");
        titleItem.innerText = item.title;

        const imageItem = document.createElement("img");
        imageItem.src = '../../Backend/images/' + item.imageUrl.split('/')[4];

        const categoryItem = document.createElement("h3");
        categoryItem.innerText = item.category;

        // userID? categoryID?

        sectionItem.appendChild(itemElement);
        itemElement.appendChild(imageItem);
        itemElement.appendChild(titleItem);
    }
}

window.addEventListener("load", fetchProjets);



// ..........................................................


// boutons modifier

let overallModal = document.querySelector(".container-modale");
let modal = document.querySelector(".modale");
let modalAjout = document.querySelector(".second-modale");
let openModalAjout = document.querySelector(".btn-modale");

hiddenElements[2].addEventListener("click", function(e) {
    e.preventDefault
    overallModal.style.display = "flex";
    modal.style.display = "flex";
    overallModal.addEventListener('click', closeModal);
    modal.querySelector(".close-modal").addEventListener('click', closeModal)
    adminGallery(projets)
})

const closeModal = function(e) {
    e.preventDefault
    overallModal.style.display = "none";
    modal.style.display = "none";
    modalAjout.style.display = "none";
    document.querySelectorAll("img").forEach((element) => {
        if (element.className == "thumbnail") {
            element.remove()
        }

    })
    document.querySelectorAll("p").forEach((element) => {
        if (element.className == "container-thumbnail") {
            element.remove()
        }
    })
    document.querySelectorAll("p").forEach((element) => {
        if (element.className == "edit") {
            element.remove()
        }
    })
}

openModalAjout.addEventListener("click", function(e) {
    e.preventDefault
    overallModal.style.display = "flex";
    modalAjout.style.display = "flex";
    modal.style.display = "none";
    overallModal.addEventListener('click', closeModal);
    modalAjout.querySelector(".close-modal").addEventListener('click', closeModal)
})


/*
hiddenElements[1] // description

hiddenElements[2] // projets
*/

// ..........................................................

// filtres catégories

// filtre "tous"

const btnAll = document.querySelector(".btnOne");
btnAll.addEventListener("click", function() {
    document.querySelector(".ficheGalerie").innerHTML = "";
    generateGallery(projets);
});

// filtre "objets"

const btnItems = document.querySelector(".btnTwo");
btnItems.addEventListener("click", function() {
    const filterItems = projets.filter(p => p.categoryId == 1);
    document.querySelector(".ficheGalerie").innerHTML = "";
    generateGallery(filterItems);
})

// filtre "appartemments"

const btnAppart = document.querySelector(".btnThree");
btnAppart.addEventListener("click", function() {
    const filterAppart = projets.filter(p => p.categoryId == 2);
    document.querySelector(".ficheGalerie").innerHTML = "";
    generateGallery(filterAppart);
})

// filtre "hôtels et restaurants"

const btnRestau = document.querySelector(".btnFour");
btnRestau.addEventListener("click", function() {
    const filterRestau = projets.filter(p => p.categoryId == 3);
    document.querySelector(".ficheGalerie").innerHTML = "";
    generateGallery(filterRestau);
})






// ..........................................................


// fetch suppression de travaux

function deleteItem(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "DELETE"
    }).then((value) => {
        console.log(value)
    })
}


function adminGallery(projets) {
    for (let i = 0; i < projets.length; i++) {
        const item = projets[i];

        const sectionItem = document.querySelector(".grid-modal");
        const itemElement = document.createElement("item");

        const imageItem = document.createElement("img");
        imageItem.className = "thumbnail";
        imageItem.src = '../../Backend/images/' + item.imageUrl.split('/')[4];

        const edit = document.createElement("p");
        edit.className = "edit";
        edit.innerText = "éditer";

        const trashBtn = document.createElement("p");
        trashBtn.className = "container-thumbnail";
        trashBtn.innerHTML = `<i class="fa-solid fa-trash fa-xs"></i>`;
        trashBtn.id = item.id;
        trashBtn.addEventListener('click', (e) => {
            e.preventDefault()
            deleteItem(e.target.id)
        })

        sectionItem.appendChild(itemElement);
        itemElement.appendChild(imageItem);
        itemElement.appendChild(trashBtn);
        itemElement.appendChild(edit);


    }
}



// ..........................................................


// ajout nouveaux travaux

document.getElementById("newValider").addEventListener("click", async function(event) {
    event.preventDefault()

    const newImgElement = document.getElementById('new-img');
    const imageFile = newImgElement.files[0];
    let newTitleElement = document.getElementById("new-title").value
    let newCatElement = document.getElementById("new-category").value

    if (newImgElement !== null && newImgElement !== "" && newTitleElement !== null && newTitleElement !== "" && newCatElement !== "0") {

        const body = new FormData();
        body.append("image", imageFile)
        body.append("title", newTitleElement)
        body.append("category", newCatElement)

        const request = new XMLHttpRequest();
        const url = 'http://localhost:5678/api/works';

        request.open('POST', url, true);
        request.setRequestHeader('Authorization', 'Bearer ' + `${token}`);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 201) {
                    console.log(request.responseText);
                } else {
                    const alert = document.querySelector(".alert");
                    alert.style.display = "inline";
                    console.log(imageFile)
                }
            }
        };
        request.send(body);
    } else {
        const alert = document.querySelector(".secondAlert");
        alert.style.display = "inline";
        console.log(imageFile)
        if (imageFile == undefined) {
            alert.innerText = "";
            alert.innerText = alert.textContent + "fichier incorrect";
        } else if (newTitleElement == null || newTitleElement == "") {
            alert.innerText = "";
            alert.innerText = alert.textContent + "titre incorrect ";
        } else if (newCatElement == null || newCatElement == 0) {
            alert.innerText = "";
            alert.innerText = alert.textContent + "catégorie incorrect ";
        }
    }
})