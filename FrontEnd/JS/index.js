// recupération token
const token = window.sessionStorage.getItem("token");

// ..........................................................


// affichage du contenu selon le statut de connexion
let hiddenElements = document.querySelectorAll(".modifier");

// si le token est null, les boutons et liens admin n'apparaissent pas
if (token !== null) {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('logout-button').style.display = 'inline';
    hiddenElements.forEach(hiddenElements => hiddenElements.style.display = "inline");
    document.querySelector(".bande-edition").style.display = "flex";

    // si le token est dispo, les boutons et liens admin apparaissent
} else {
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('login-button').style.display = 'inline';
    hiddenElements.forEach(hiddenElements => hiddenElements.style.display = "none");
    document.querySelector(".bande-edition").style.display = "none";

}

// ..........................................................


//suppression du token à la déconnexion
document.getElementById("logout-button").addEventListener("click", async function() {
    window.sessionStorage.removeItem("token");
})

// ..........................................................


// fetch des projets pour la home page
let projets = [];
async function fetchProjets() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => (projets = data));
    generateGallery(projets)
}

// génération de la galerie de la home page
function generateGallery(projets) {
    for (let i = 0; i < projets.length; i++) {
        const item = projets[i];

        // récupération des éléments DOM
        const sectionItem = document.querySelector(".ficheGalerie");
        const itemElement = document.createElement("item");

        const titleItem = document.createElement("h3");
        titleItem.innerText = item.title;

        const imageItem = document.createElement("img");
        imageItem.src = '../../Backend/images/' + item.imageUrl.split('/')[4];

        const categoryItem = document.createElement("h3");
        categoryItem.innerText = item.category;

        sectionItem.appendChild(itemElement);
        itemElement.appendChild(imageItem);
        itemElement.appendChild(titleItem);
    }
}

// les projets sont chargés au chargement de la page
window.addEventListener("load", fetchProjets);

// ..........................................................


// DOM boutons "modifier" liés aux modales
let overallModal = document.querySelector(".container-modale");
let modal = document.querySelector(".modale");
let modalAjout = document.querySelector(".second-modale");
let openModalAjout = document.querySelector(".btn-modale");

// eventlistener du bouton modifier liés à la première modale
hiddenElements[2].addEventListener("click", function(e) {
    e.preventDefault
        // le changement des styles display permet l'apparition du contenu
    overallModal.style.display = "flex";
    modal.style.display = "flex";
    // le click extérieur ferme la modale
    overallModal.addEventListener('click', closeModal);
    // le click sur la croix ferme la modale
    modal.querySelector(".close-modal").addEventListener('click', closeModal)
    adminGallery(projets)
})

// fonction permettant la fermeture de la modale (utilisée sur le click extérieur et la croix)
const closeModal = function(e) {
    e.preventDefault
        // les styles display passent en none pour masquer la modale
    overallModal.style.display = "none";
    modal.style.display = "none";
    modalAjout.style.display = "none";

    // suppression de la précédente galerie en cas de fermeture et réouverture de la modale sans rafraichir la page
    document.querySelectorAll("div").forEach((element) => {
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

// ouverture de la seconde modale depuis la première modale
openModalAjout.addEventListener("click", function(e) {
    e.preventDefault
        // les styles display de la seconde modale passent en flex pour apparaitre 
    overallModal.style.display = "flex";
    modalAjout.style.display = "flex";
    // le style display de la modale actuelle passent en none pour disparaitre 
    modal.style.display = "none";
    // eventlisteners pour la fermeture au click extérieur ou sur la croix
    overallModal.addEventListener('click', closeModal);
    modalAjout.querySelector(".close-modal").addEventListener('click', closeModal)
})

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

// génération de la galerie administrateur (modale)
function adminGallery(projets) {
    for (let i = 0; i < projets.length; i++) {
        const item = projets[i];

        // récupération des éléments DOM
        const sectionItem = document.querySelector(".grid-modal");
        const itemElement = document.createElement("item");

        const imageItem = document.createElement("div");
        imageItem.className = "thumbnail";
        imageItem.style.backgroundImage = "url(../../Backend/images/" + item.imageUrl.split('/')[4] + ")";

        const edit = document.createElement("p");
        edit.className = "edit";
        edit.innerText = "éditer";

        // récupération du bouton corbeille et ajout d'un eventlistener pour la suppression
        const trashBtn = document.createElement("p");
        trashBtn.className = "container-thumbnail";
        trashBtn.innerHTML = `<i class="fa-solid fa-trash fa-xs" id="${item.id}"></i>`;
        trashBtn.id = item.id;
        trashBtn.addEventListener('click', (e) => {
            e.preventDefault()
            deleteItem(e.target.id)
            console.log(e)
        })

        sectionItem.appendChild(itemElement);
        itemElement.appendChild(imageItem);
        imageItem.appendChild(trashBtn);
        itemElement.appendChild(edit);


    }
}

// ..........................................................


// ajout nouveaux travaux

document.getElementById("newValider").addEventListener("click", async function(event) {
    event.preventDefault()

    // récupération des éléments dom liés au formulaire d'ajout de nouveaux travaux
    const newImgElement = document.getElementById('new-img');
    const imageFile = newImgElement.files[0];
    let newTitleElement = document.getElementById("new-title").value
    let newCatElement = document.getElementById("new-category").value

    // condition si tous les champs sont remplis (différent de null ou différent de vide)
    if (newImgElement !== null && newImgElement !== "" && newTitleElement !== null && newTitleElement !== "" && newCatElement !== "0") {

        // création d'un nouvel élément
        const body = new FormData();
        body.append("image", imageFile)
        body.append("title", newTitleElement)
        body.append("category", newCatElement)

        // requête à l'API 
        const request = new XMLHttpRequest();
        const url = 'http://localhost:5678/api/works';
        request.open('POST', url, true);
        request.setRequestHeader('Authorization', 'Bearer ' + `${token}`);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                // ajout avec succès si la requête est un succès (201)
                if (request.status === 201) {
                    console.log(request.responseText);
                    // affichage d'une erreur si le statut de la requête est différent de 201
                } else {
                    const alert = document.querySelector(".alert");
                    alert.style.display = "inline";
                }
            }
        };
        request.send(body);
        // affichage des erreurs si le formulaire n'est pas bien rempli
    } else {
        const alert = document.querySelector(".secondAlert");
        alert.style.display = "inline";
        if (imageFile === undefined) {
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