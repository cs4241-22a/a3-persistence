let tempID = null, tempElement = null;
function dothething()
{
    fetch('/data', { method: 'GET', headers: { "Content-Type": "application/json" } })
    .then( response => response.json() )
    .then( json => builder( json[ 0 ].entries ));
};
function builder ( json )
{
    const tbl = document.getElementById( 'datatable' );
    tbl.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th><th>directed by Todd Phillips?</th><th>edit?</th><th>delete?</th></tr>';
    json.forEach(entry => 
    {
        let newRow  = '<tr id = "' + entry.id + '">';
            newRow += '<th>' + entry.title.toString().toUpperCase() + '</th>';
            newRow += '<th>' + entry.genre.toString().toUpperCase() + '</th>';
            newRow += '<th>' + entry.year + '</th>';
            newRow += '<th>' + toddcheck( entry.title, entry.year ) + '</th>';
            newRow += '<th><button onclick="updater(' + entry.id + ',' + entry.title + ',' + entry.genre + ',' + entry.year + ');">submit</button></th>';
            newRow += '<th><button onclick="deleter(' + entry.id + ');">delete?</button></th>';
        datatable.innerHTML += newRow;
    });
};
function submitter( e )
{
    const title = document.getElementById('title'), 
          genre = document.getElementById('genre'), 
           year = document.getElementById('year'), 
           json = { title: title.value, genre: genre.value, year: year.value }, 
           body = JSON.stringify(json);
    fetch('/submit', { method: 'POST', headers: { "Content-Type": "application/json" }, body })
    .then( response => response.json())
    .then(dothething());
    return false;
};
function deleter( id )
{
    const json = { id: x.id }, 
          body = JSON.stringify( json );
    fetch( '/delete', { method: 'POST', headers: { "Content-Type": "application/json" }, body } )
    .then( response => { response.json() })
    .then( dothething() );
    return false;
};
function updater( id, title, genre, year )
{
    if( tempElement != null && tempID != null ) { updatercanceller( tempID ); }
    tempID = id;
    tempElement = document.getElementById('row-'+id);
    let newRow  = '<th>' + id + '</th>';
        newRow += '<th><input type="text"   value="' + title + '"></th>'
        newRow += '<th><input type="text"   value="' + genre + '"></th>'
        newRow += '<th><input type="number" value="' +  year + '"></th>'
        newRow += '<th><button onclick="updatercanceller(' + id + ')>cancel?</button></th>';
        newRow += '<th><button onclick="updatersubmiter(' + id + ')>submit</button></th>';
    tempElement.innerHTML = newRow;
};
function updatercanceller( id )
{
    let title  = document.getElementById( 'title-${tempID}' ).value,
        genre  = document.getElementById( 'genre-${tempID}' ).value,
         year  = document.getElementById(  'year-${tempID}' ).value,
       newRow  = '<th>' + tempID + '</th>';
       newRow += '<th>' + title + '</th>';
       newRow += '<th>' + genre + '</th>';
       newRow += '<th>' + year + '</th>';
       newRow += '<th>' + toddCheck(title, genre) + '<\th>';
       newRow += '<th><button onclick="updater(\'${entry.id}\', \'${entry.title}\', \'${entry.genre}\', \'${entry.year}\');">edit?</button></th>';
       newRow += '<th><button onclick="deleter(\'${entry.id}\');"">delete?</button></th>';
    tempElement.innerHTML = newRow;
    tempElement = null;
    tempID = null;
};
function updatersubmitter( id )
{
    const json = {    id: id,
                   title: document.getElementById('title-'+id).value,
                   genre: document.getElementById('genre-'+id).value,
                    year: document.getElementById( 'year-'+id).value
                 },
          body = JSON.stringify(json);
    fetch( '/update', { method: 'POST', headers: { "Content-Type": "application/json" }, body })
    .then( response => response.json() )
    .then( dothething() );
    tempID = null;
    tempElement = null;
}
const toddcheck = function( title, year ) {
    const years = [ 2000, 2003, 2004, 2006, 2009, 2010, 2011, 2013, 2016, 2019 ];
    const titles = [ 'ROAD TRIP', 'OLD SCHOOL', 'STARSKY & HUTCH', 'SCHOOL FOR SCOUNDRELS', 'THE HANGOVER',
                     'DUE DATE', 'THE HANGOVER PART II', 'THE HANGOVER III', 'WAR DOGS', 'JOKER' ];
    const numFilms = 10;
    title = title.toString().toUpperCase();
    for ( let i = 0 ;  i < numFilms ; i++ ) { if( year == years[ i ] && title == titles[ i ] ) { return 'YES!'; } }
    return 'NO!'; };
window.onload = function() {
    const submit = document.getElementById( 'submit' );
    submit.onclick = submitter;
    dothething(); };