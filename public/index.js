document.addEventListener('DOMContentLoaded', async function(){
    document.forms['new-favorite-form'].addEventListener('submit', (event) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        formData.append('token', localStorage.getItem('a3-token'));
        fetch(event.target.action, {
            method: event.target.method,
            body: new URLSearchParams(formData)
        }).then((response) => {
            localStorage.setItem('a3-loginType', 'success');
            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
        return false;
    });

    fetch('/api/favorites?token='+localStorage.getItem('a3-token'), {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(async function(response){
        console.log(response);
        var body = await response.json();
        console.log(body);
        init(body);
    });
}, false);

async function init(userData){
    console.log("User Data:");
    console.log(userData);
    if(userData == null){ //Server doesn't remember our token; it probably restarted while we were logged in
        window.location.href = './login.html';
    }
    var list = document.getElementById('favorites-list');
    var dummyCategory = document.getElementById('dummy-category');
    
    //Identify all unique categories
    var categories = [...new Set(userData.favorites.map((favorite => favorite.category)))]; //Get an array of all unique favorite categories (thanks for the one-liner, https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
    console.log(categories);
    categories.forEach(categoryName => {
        //For each unique category, clone a dummy category and modify it as necessary
        var categoryElement = dummyCategory.cloneNode(true);
        categoryElement.removeAttribute('id');
        categoryElement.getElementsByTagName('h2')[0].innerText = categoryName || "Uncategorized";
        var favoritesElement = categoryElement.getElementsByTagName('ul')[0];
        var dummyFavorite = favoritesElement.getElementsByTagName('li')[0];
        //Add all favorites of that category to it
        userData.favorites.forEach(favorite => {
            if(favorite.category == categoryName){
                var favoriteElement = dummyFavorite.cloneNode(true);
                favoriteElement.innerHTML = `<span style="font-weight:bold;">${favorite.key}: ${favorite.value}</span><br/><div>${favorite.description}</div>`;
                favoritesElement.appendChild(favoriteElement);
            }
        });
        favoritesElement.removeChild(dummyFavorite);
        list.appendChild(categoryElement);
        //Also add it as an option to the categories dropdown for new favorites
        var option = document.createElement('option');
        option.value = categoryName;
        option.innerText = categoryName;
        document.getElementById("categories-dropdown").appendChild(option);
    });

    //Display a message if no favorites exist yet
    if(userData.favorites.length == 0){
        document.getElementById('no-favorites-div').classList = [];
        document.getElementById('no-favorites-div').display = 'inline';
        document.getElementById('no-favorites-div').style.marginLeft = 'auto';
        document.getElementById('no-favorites-div').style.marginRight = 'auto';
        document.getElementById('no-favorites-div').style.textAlign = 'center';
    }

    //Hide the original dummy category
    dummyCategory.style.display = 'none';

    //Set the user's name and registered/logged in confirmation
    var message = `Hello, ${userData.user}!`
    switch(localStorage.getItem('a3-loginType')){
        case 'newUser':
            message += ' Your new account has been registered.';
            break;
        case 'success':
        default:
            message += ' You are now logged in.';
            break;
    }
    document.getElementById('welcome-message').innerText = message;
}