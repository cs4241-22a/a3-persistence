let tempID = null, tempElement = null;
function dothething()
{
    fetch('/data', { method: 'GET', headers: { "Content-Type": "application/json" } })
    .then( response => response.json() )
    .then( json => builder( json[ 0 ].items ));
};
function builder ( json )
{
    const tbl = document.getElementById( 'datatable' );
    tbl.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th><th>directed by Zack Snyder?</th><th>edit?</th><th>delete?</th></tr>';
    console.log('ok?');
    if( json != null )
    {
        console.log('ok!');
        json.forEach(entry => 
            {
                let newRow  = '<tr id = "' + entry._movID + '">';
                    newRow += '<th>' + entry.title.toString().toUpperCase() + '</th>';
                    newRow += '<th>' + entry.genre.toString().toUpperCase() + '</th>';
                    newRow += '<th>' + entry.year + '</th>';
                    newRow += '<th>' + zackcheck( entry.title, entry.year ) + '</th>';
                    newRow += '<th><button onclick="updater(\'' + entry._movID + '\',\'' + entry.title + '\',\'' + entry.genre + '\',\'' + entry.year + '\');">edit?</button></th>';
                    newRow += '<th><button onclick="deleter(\'' + entry._movID + '\');">delete?</button></th>';
                datatable.innerHTML += newRow;
            });
    }
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
function deleter( _movID )
{
    const json = { _movID: _movID }, 
          body = JSON.stringify( json );
    fetch( '/delete', { method: 'POST', headers: { "Content-Type": "application/json" }, body } )
    .then( response => { response.json() })
    .then( dothething() );
    return false;
};
function updater( _movID, title, genre, year )
{
    if( tempElement != null && tempID != null ) { updatercanceller( tempID ); }
    tempID = _movID;
    tempElement = document.getElementById(_movID);
    let newRow  = '<tr id = "' + _movID + '">';
        newRow += '<th><input type="text"   value="' + title + '"></th>'
        newRow += '<th><input type="text"   value="' + genre + '"></th>'
        newRow += '<th><input type="number" value="' +  year + '"></th>'
        newRow += '<th></th>';
        newRow += '<th><button onclick="updatersubmitter(\'' + _movID + '\')">submit</button></th></tr>';
        newRow += '<th><button onclick="updatercanceller(\'' + _movID + '\')">cancel?</button></th>';
    tempElement.innerHTML = newRow;
};
function updatercanceller( _movID )
{
    let element  = document.getElementById( _movID ),
        title  = element.title,
        genre  = element.genre,
         year  = element.year,
       newRow  = '<tr id = "' + id + '">';
       newRow += '<th>' + title + '</th>';
       newRow += '<th>' + genre + '</th>';
       newRow += '<th>' + year + '</th>';
       newRow += '<th>' + zackcheck(title, genre) + '<\th>';
       newRow += '<th><button onclick="updater(\'' + _movID + '\',\'' + title + '\',\'' + genre + '\',\'' + year + '\');">edit?</button></th>';
       newRow += '<th><button onclick="deleter(\'' + _movID + '\');">delete?</button></th>';
    tempElement.innerHTML = newRow;
    tempElement = null;
    tempID = null;
};
function updatersubmitter( _movID )
{
    const json = { _movID: _movID,
                    title: document.getElementById( _movID ).title,
                    genre: document.getElementById( _movID ).genre,
                     year: document.getElementById( _movID ).year
                 },
          body = JSON.stringify(json);
    fetch( '/update', { method: 'POST', headers: { "Content-Type": "application/json" }, body })
    .then( response => response.json() )
    .then( dothething() );
    tempID = null;
    tempElement = null;
}
const zackcheck = function( title, year ) {
    const years = [ 2004, 2007, 2009, 2010, 2011, 2013, 2016, 2017, 2021, 2021 ];
    const titles = [ 'DAWN OF THE DEAD', '300', 'WATCHMEN', 'LEGEND OF THE GUARDIANS: THE OWLS OF GA\'HOOLE',
                     'SUCKER PUNCH', 'MAN OF STEEL', 'BATMAN V SUPERMAN: DAWN OF JUSTICE', 'JUSTICE LEAGUE',
                     'ZACK SNYDER\'S JUSTICE LEAGUE', 'ARMY OF THE DEAD']
    const numFilms = 10;
    title = title.toString().toUpperCase();
    for ( let i = 0 ;  i < numFilms ; i++ ) { if( year == years[ i ] && title == titles[ i ] ) { return 'YES!'; } }
    return 'NO!'; };
window.onload = function() {
    const submit = document.getElementById( 'submit' );
    submit.onclick = submitter;
    dothething(); };