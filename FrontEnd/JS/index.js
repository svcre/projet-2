let projets = [];
async function fetchProjets() {
    await fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((data) => (projets = data));
      generateGallery()
  }


                // générer galerie img + titres
function generateGallery() {
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


/* async function fetchProjets () {
    await fetch("http://localhost:5678/api/works", {
    method: "GET"
    })
    .then(function(response) {
    response.json()
    .then(function(json) {
        projets = json   
    })
});
} */






// ..........................................................

                // page de connexion




// ..........................................................


                // filtres catégories

                    // filtre "tous"

    const btnAll = document.querySelector(".btnOne");
    btnAll.addEventListener("click", function() {
        document.querySelector(".ficheGalerie").innerHTML = "";
        generateGallery();
    });

                    // filtre "objets"

    const btnItems = document.querySelector(".btnTwo");
    btnItems.addEventListener("click", function() {
        const filterItems = projets.filter(categoryId => categoryId = 1);
        console.log(filterItems);
        /*
        const filterItems = projets.filter(function () {
            return projets.categoryId = "1"; */
        // }) 
        document.querySelector(".ficheGalerie").innerHTML = "";
        generateGallery(filterItems);
        })

        // 

                    // filtre "appartemments"


                    // filtre "hôtels et restaurants"
                    


// ..........................................................


                // fenêtre modale