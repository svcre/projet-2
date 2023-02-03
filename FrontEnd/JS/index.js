
                // recupération token

const token =  window.sessionStorage.getItem("token");
console.log(token)


        // bouton login / logout

if (token !== null) {
    document.getElementById('login-button').style.display = 'none'; 
    document.getElementById('logout-button').style.display = 'inline'; 

    } else {
        document.getElementById('logout-button').style.display = 'none'; 
        document.getElementById('login-button').style.display = 'inline'; 

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


                // fenêtre modale