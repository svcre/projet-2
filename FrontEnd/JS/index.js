
                // recupération token

const token =  window.sessionStorage.getItem("token");


        // contenu connecté/déconnecté

let hiddenElements = document.querySelectorAll(".modifier");

if (token !== null) {
    document.getElementById('login-button').style.display = 'none'; 
    document.getElementById('logout-button').style.display = 'inline'; 
    hiddenElements.forEach( hiddenElements => hiddenElements.style.display = "inline");
    document.querySelector(".bande-edition").style.display = "flex";

    } else {
        document.getElementById('logout-button').style.display = 'none'; 
        document.getElementById('login-button').style.display = 'inline'; 
        hiddenElements.forEach( hiddenElements => hiddenElements.style.display = "none");
        document.querySelector(".bande-edition").style.display = "none";


    }

        //suppression du token à la déconnexion

    document.getElementById("logout-button").addEventListener("click", async function(){
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
    for (let i=0; i < projets.length; i++) {
        const item = projets[i];

        const sectionItem = document.querySelector(".ficheGalerie");
        const itemElement = document.createElement("item");

        const titleItem = document.createElement("h3");
        titleItem.innerText = item.title;

        const imageItem = document.createElement ("img");
        imageItem.src = item.imageUrl;

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

hiddenElements[2].addEventListener("click", function(e){
    e.preventDefault
    overallModal.style.display = "flex";
    modal.style.display = "flex";
    // TODO fixer le click qui ferme la modale
    // overallModal.addEventListener('click', closeModal);
    modal.querySelector(".close-modal").addEventListener('click', closeModal)
    adminGallery(projets)
}) 

const closeModal = function (e) {
    e.preventDefault
    overallModal.style.display = "none";
    modal.style.display = "none";
   document.querySelectorAll("img").forEach((element) => {
        if (element.className == "thumbnail") {
            element.remove()
        }
    })
}


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


function adminGallery(projets) {
    for (let i=0; i < projets.length; i++) {
        const item = projets[i];

        const sectionItem = document.querySelector(".grid-modal");
        const itemElement = document.createElement("item");

        const imageItem = document.createElement("img");
        imageItem.className = "thumbnail";
        imageItem.src = item.imageUrl;

        const edit = document.createElement("p");
        edit.className = "edit";
        edit.innerText = "éditer";

        const trashBtn = document.createElement("p");
        // TODO Remplacer "supprimer" par une icone 
        trashBtn.className = "container-thumbnail";

        sectionItem.appendChild(itemElement);
        itemElement.appendChild(imageItem);
        itemElement.appendChild(edit);
        itemElement.appendChild(trashBtn)
    }
}


async function deleteItem(id) {
    const remove = await fetch("http://localhost:5678/api/works/${id}", {
  headers: {
    Accept: "*/*"
  },
  method: "DELETE"
})
}

async function deleteBtn() {
    console.log(deleteBtn.target.id)
    document.querySelector(".container-thumbnail").addEventListener("click", deleteItem)

}
