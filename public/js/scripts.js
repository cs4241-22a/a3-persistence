let searchState = {};
let localList = {};

const getList = function() {
    fetch('/list', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const movieList = document.querySelector("#movie-list");
        const list = JSON.parse(data.list);

        // Reset list
        while(movieList.firstChild) {
            movieList.removeChild(movieList.firstChild);
        }
        
        if (list.length === 0) {
            const listEmpty = document.createElement("p")
            const listEmptyText = document.createTextNode(`${data.user}'s list is empty, click New Movie below and start watching!`);
            listEmpty.id = "your-list";
            listEmpty.appendChild(listEmptyText)
            movieList.appendChild(listEmpty);
        } else {
            const yourList = document.createElement('p');
            const yourListText = document.createTextNode(`${data.user}'s Watchlist:`);
            yourList.appendChild(yourListText);
            yourList.id = "your-list";
            movieList.appendChild(yourList);
        }

        let i = 0;
        list.forEach(e => {
            const dEl = document.createElement('div');
            dEl.className = "title";
            
            imgEl = document.createElement('img');
            imgEl.src = e['Poster'];
            imgEl.className = "poster";

            const aEl = document.createElement('a');
            aEl.href = e['URL'];
            aEl.className = 'title';

            const pEl = document.createElement('p');
            const movieTitle = document.createTextNode(`${e['Title']} (${e['Year']})`);
            pEl.className = 'title';
            
            pEl.appendChild(movieTitle);
            aEl.appendChild(pEl);

            const rmvBtn = document.createElement('button');
            const rmvTxt = document.createTextNode("-");
            rmvBtn.type = 'button';
            rmvBtn.className = 'rmvbtn';
            rmvBtn.id = `rmv${i}`;
            rmvBtn.addEventListener('click', removeMovie);
            rmvBtn.appendChild(rmvTxt);

            const upBtn = document.createElement('button');
            const upTxt = document.createTextNode("↑");
            upBtn.type = 'button';
            upBtn.className = 'btn';
            upBtn.id = `upp${i}`;
            upBtn.addEventListener('click', mvupMovie);
            upBtn.appendChild(upTxt);

            const dnBtn = document.createElement('button');
            const dnTxt = document.createTextNode("↓");
            dnBtn.type = 'button';
            dnBtn.className = 'btn';
            dnBtn.id = `dwn${i}`;
            dnBtn.addEventListener('click', mvdnMovie);
            dnBtn.appendChild(dnTxt);
            
            dEl.appendChild(imgEl);
            dEl.appendChild(aEl);
            dEl.appendChild(rmvBtn);
            dEl.appendChild(upBtn);
            dEl.appendChild(dnBtn);
    
            movieList.appendChild(dEl);
            i++;
        });

        localList = list;
    });
}

const login = (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (/^[\w_-]+$/.test(username) && /^[\w_-]+$/.test(password)) {
        fetch( '/login', {
            method:'POST',
            body: JSON.stringify({ 
                username: username, 
                password: password 
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                document.querySelector('.login').classList.add('hidden');
                document.querySelector('.content').classList.remove('hidden');

                getList();
            } else {
                document.querySelector("#login-error").innerText = "Incorrect credentials. Try again.";
            }
        }); 
    } else {
        document.querySelector("#login-error").innerText = "Username and password must be alphanumeric without spaces.";
    }
}

const register = (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (/^[\w_-]+$/.test(username) && /^[\w_-]+$/.test(password)) {
        fetch( '/register', {
            method:'POST',
            body: JSON.stringify({ 
                username: username, 
                password: password 
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                document.querySelector('.login').classList.add('hidden');
                document.querySelector('.content').classList.remove('hidden');

                getList();
            } else {
                document.querySelector("#login-error").innerText = "Account already exists, please log in with correct credentials.";
            }
        }); 
    } else {
        document.querySelector("#login-error").innerText = "Username and password must be alphanumeric without spaces.";
    }
}

const search = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // Show loading
    const currentResults = document.getElementById('titles');
    if (currentResults) {
        currentResults.innerText = "Loading...";
    }

    const input = document.querySelector( '#search-bar' )

    fetch( '/search', {
        method:'POST',
        body: JSON.stringify({ 
            type: "search", 
            title: input.value 
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data['type'] === 'queryResp') {
            showSearchResults(data['data']['Search']);
        }
    }); 

    return false;
}

const addMovie = function(e) {
    e.preventDefault();

    let idx = e['target'].id.substring(3);

    fetch( '/edit', {
        method:'POST',
        body: JSON.stringify({
            type: "add", 
            entry: searchState[idx]
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(response => response.status)
    .then(data => {
        if (data === 200) {
            getList();
        }
    }); 

}

const removeMovie = function(e) {
    e.preventDefault();

    let idx = e['target'].id.substring(3);

    fetch( '/edit', {
        method:'POST',
        body: JSON.stringify({ 
            type: "rmv", 
            entry: localList[idx] 
        }),
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(response => response.status)
    .then(data => {
        if (data === 200) {
            getList();
        }
    }); 
}

const mvupMovie = function(e) {
    e.preventDefault();

    let idx = e['target'].id.substring(3);

    fetch( '/edit', {
        method:'POST',
        body: JSON.stringify({
            type: "movup", 
            entry: localList[idx]
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(response => response.status)
    .then(data => {
        if (data === 200) {
            getList();
        }
    }); 
}

const mvdnMovie = function(e) {
    e.preventDefault();

    let idx = e['target'].id.substring(3);

    const json = { type: "movdn", 
                   entry: localList[idx] },
          body = JSON.stringify(json)

    fetch( '/edit', {
        method:'POST',
        body: JSON.stringify({
            type: "movdn", 
            entry: localList[idx]
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(response => response.status)
    .then(data => {
        if (data === 200) {
            getList();
        }
    }); 
}

const collapse = function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;

    if (this.innerText == "+ New Movie") {
        this.innerText = "- New Movie";
    }
    else {
        this.innerText = "+ New Movie";
    }

    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    } 
};

const showSearchResults = function(results) {
    const currentResults = document.getElementById('titles');
    const content = document.getElementById('new-entry');
    searchState = results;

    // Check for no results
    if (results === undefined) {
        if (currentResults) {
            currentResults.innerText = "No movies found :(";
            content.style.maxHeight = content.scrollHeight + "px";
            return;
        }
    }

    // Remove existing results
    if (currentResults) {
        currentResults.parentNode.removeChild(currentResults);
    }

    let i = 0;
    // Create new query response element
    const resultsEl = document.createElement('div');
    resultsEl.id = "titles";

    results.forEach( e => {
        const dEl = document.createElement('div');
        dEl.className = "title";

        const pEl = document.createElement('p');
        const movieTitle = document.createTextNode(`${e['Title']} (${e['Year']})`);
        pEl.className = 'title';
        pEl.appendChild(movieTitle);

        const addBtn = document.createElement('button');
        const addTxt = document.createTextNode("+");
        addBtn.type = 'button';
        addBtn.className = 'btn';
        addBtn.id = `add${i}`;
        addBtn.addEventListener('click', addMovie);
        addBtn.appendChild(addTxt);

        dEl.appendChild(pEl);
        dEl.appendChild(addBtn);

        resultsEl.appendChild(dEl);

        i++;
    });

    console.log(resultsEl);
    const parentDiv = document.getElementById('search-results');
    parentDiv.appendChild(resultsEl);

    // Resize bounding box
    content.style.maxHeight = content.scrollHeight + "px";
}

let wordBank = ["killer", "awesome", "jaw-dropping", "spectacular", "scary", "tear-jerking",
                "illustrious", "sexy", "outstanding", "great", "favorite", "incredible",
                "classic", "wonderful", "special", "insightful", "first-rate", "intriguing",
                "riveting", "powerful", "legendary", "pretentious", "tender", "charming", "hilarious",
                "clever", "absorbing", "award-winning", "awe-inspiring", "beautiful", "bold",
                "colorful", "iconic", "controversial", "daring", "phenomenal", "engrossing"];
let scrambler = "";

document.querySelectorAll('.scrambleable').forEach(function(el) {
    el.addEventListener('mouseenter', (e) => {
        scrambler = setInterval(function() {el.innerText = scramble()}, 100)
    });
    
    el.addEventListener('mouseleave', (e) => {
        clearInterval(scrambler);
    });
});

function scramble() {
    // Return a movie adjective
    const randWord = Math.floor(Math.random() * wordBank.length);
    
    return wordBank[randWord];
}

window.onload = function() {
    const login_btn = document.querySelector('#login');
    const register_btn = document.querySelector('#register');    
    const add_btn = document.querySelector('#new-movie');
    const search_button = document.querySelector('#search');
    const search_input = document.querySelector('#search-bar'); 

    login_btn.onclick = login;
    register_btn.onclick = register;

    add_btn.addEventListener('click', collapse);
    search_button.onclick = search;

    search_input.addEventListener("keyup", function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementById("search").click();
        }
    });
}