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
        // imageItem.crossorigin = "anonymous";
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
}).then(function(response) {
    response.json().then(function(json) {
        generateGallery(json)
    })
});


            //      (ノಠ益ಠ)ノ彡┻━┻   !!!!!!!!






// page de connexion



// filtres catégories




// fenêtre modale