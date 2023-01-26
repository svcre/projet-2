                // générer galerie img + titres
function generateGallery(json) {
    for (let i=0; i < json.length; i++) {
        const item = json[i];
        console.log(item);

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

fetch("http://localhost:5678/api/works", {
    method: "GET"
    })
    .then(function(response) {
    response.json()
    .then(function(json) {
        generateGallery(json)
    })
});

// ..........................................................

                // page de connexion




// ..........................................................


                // filtres catégories

                    // filtre "tous"

    const btnAll = document.querySelector(".btnOne");
    btnAll.addEventListener("click", function() {
        document.querySelector(".ficheGalerie").innerHTML = "";
        generateGallery(json); //json??
    });

                    // filtre "objets"

    const btnItems = document.querySelector(".btnTwo");
    btnItems.addEventListener("click", function() {
        const filterItems = json.filter(function () {  //json??
            return item.categoryId = "1";
        })
        document.querySelector(".ficheGalerie").innerHTML = "";
        generateGallery(filterItems);
    })

                    // filtre "appartemments"


                    // filtre "hôtels et restaurants"
                    


// ..........................................................


                // fenêtre modale