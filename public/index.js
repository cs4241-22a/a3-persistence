document.addEventListener('DOMContentLoaded', async function(){
    fetch('/api/users/Feathercrown', {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(async function(response){
        var body = await response.json();
        console.log(body);
        init(body);
    });
}, false);

async function init(userData){
    var list = document.getElementById('favorites-list');
    var dummyCategory = document.getElementById('dummy-category');
    
    //Identify all unique categories
    var categories = [...new Set(userData.favorites.map((favorite => favorite.category)))]; //Get an array of all unique favorite categories (thanks for the one-liner, https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
    console.log(categories);
    categories.forEach(categoryName => {
        //For each unique category, clone a dummy category and modify it as necessary
        var categoryElement = dummyCategory.cloneNode(true);
        categoryElement.removeAttribute('id');
        categoryElement.getElementsByTagName('h2')[0].innerText = categoryName;
        var favoritesElement = categoryElement.getElementsByTagName('ul')[0];
        var dummyFavorite = favoritesElement.getElementsByTagName('li')[0];
        //Add all favorites of that category to it
        userData.favorites.forEach(favorite => {
            if(favorite.category == categoryName){
                var favoriteElement = dummyFavorite.cloneNode(true);
                favoriteElement.innerText = `${favorite.key}: ${favorite.value}`;
                favoritesElement.appendChild(favoriteElement);
            }
        });
        favoritesElement.removeChild(dummyFavorite);
        list.appendChild(categoryElement);
    });
}