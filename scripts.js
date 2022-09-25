// const { response } = require("express")

console.log('in scripts')
const songs = []
const songList = document.getElementById('results').getElementsByTagName('tbody')[0]
const songForm = document.forms[0]
const songInput = songForm.elements['songname']
const artistInput = songForm.elements['artist']
const durationInput = songForm.elements['songduration']
const albumInput = songForm.elements['album']


function addToPlaylist(songData)
{  
    console.log("adding song to playlist")
    console.log(songData)

    const newRow = songList.insertRow()
    const newCell = newRow.insertCell()
    const artistCell = newRow.insertCell()
    const durationCell = newRow.insertCell()
    const albumCell = newRow.insertCell()
    const playlistDurationCell = newRow.insertCell()
    
    const newSong = document.createTextNode(songData[0])
    const newArtist = document.createTextNode(songData[1])
    const newDuration = document.createTextNode(songData[2])
    const newAlbum = document.createTextNode(songData[3])
    const newPlaylistDuration = document.createTextNode(songData[4])
    //newSong.innerHTML = song
    newCell.appendChild(newSong)
    artistCell.appendChild(newArtist)
    durationCell.appendChild(newDuration)
    albumCell.appendChild(newAlbum)
    playlistDurationCell.appendChild(newPlaylistDuration)


    // Add specific update and remove buttons
    const updateCell = newRow.insertCell()
    const removeCell = newRow.insertCell()
    const newUpdate = document.createElement("button")
    const newRemove = document.createElement("button")
    updateCell.appendChild(newUpdate)
    removeCell.appendChild(newRemove)
  

    console.log("just added a song to the playlist")

   // const table = document.getElementById("results")
   // table.innerHTML = "<tr id='firstRow'><th>Song</th><th>Artist</th><th>Duration</th><th>Album</th><th>Playlist length</th></tr>"

  //  newData.forEach((element, index) => {

        // if(element.songname === undefined)
        // {
        //     ;
        // }
        // else
        // {
        // test  table.innerHTML += "<tr><td>" + song + "</td></tr>"
        // table.innerHTML +=
        //   "<tr><td>" + element.songname + "</td><td>"
        //   + element.artist + "</td><td>"
        //   + element.duration + "</td><td>"
        //   + element.album + "</td><td class='tally'>"
        //   + element.playlistDur + "</td></tr>"
        //}
   //   })
  }



songForm.onsubmit = function(e)
{
    e.preventDefault()

    console.log("in script submit function")
    // let songname = document.querySelector("#songname")
    // let artist = document.querySelector("#artist")
    // let duration = document.querySelector("#songduration")
    // let album = document.querySelector("#album")

    const songValue = songInput.value
    const artistValue = artistInput.value
    const durationValue = durationInput.value
    const albumValue = albumInput.value
    
    let previousDuration = 0
    if(songs.length>0)
      {
        previousDuration += parseInt(songs[songs.length-1][4])
      }
  
    const playlistDuration = previousDuration + parseInt(durationInput.value)
    
    const songData = [songValue, artistValue, durationValue, albumValue, playlistDuration]
    
    songs.push(songData)
    addToPlaylist(songData)
  
    //reset form
    songInput.value = ''
    songInput.focus()
    artistInput.value = ''
    artistInput.focus()
    durationInput.value = ''
    durationInput.focus()
    albumInput.value = ''
    albumInput.focus()
  
    // let json = {
    //   songname: songname.value,
    //   artist: artist.value,
    //   duration: duration.value,
    //   album: album.value,
    //   playlistDur: 0
    // }
    // let body = JSON.stringify(json)

    fetch( '/submit', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ "newsong":songData})
    })
    .then( res => res.json() )
    .then( json => console.log( json ) )
    // return false
}





let fillSongs = function(entries) {
  console.log("in fillSongs:")
  console.log(entries)

  entries.forEach(function(entry) {
    songs.push(entry.newsong)
  }) 
  console.log("songs:")
  console.log(songs)
}


let addAllSongs = async() =>
{
  console.log(songs)

  for(let i=0; i<songs.length; i++)
  {
    await console.log("in song loop")
    await addToPlaylist(songs[i])
  }
}


window.onload = function()
{
  console.log("on page load")

  fetch("/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(entries => {
      fillSongs(entries)
      addAllSongs()
    })
}




//   const reset = function(e)
//   {
//       e.preventDefault()
//       body = JSON.stringify("")

//       fetch( '/reset', {
//         method:'POST',
//         body
//       })
//       .then(async function(response)
//       {
//         let emptyData = await response.json()
//         emptyPlaylist(emptyData)
//         console.log(emptyData)
//       })
//       return false
      
//   }

  // function emptyPlaylist(newData)
  // {
  //   const table = document.getElementById("results")
  //   table.innerHTML = "<tr id='firstRow'><th>Song</th><th>Artist</th><th>Duration</th><th>Album</th><th>Playlist length</th></tr>"
  // }


//   window.onload = function() 
//   {
//     const submitButton = document.getElementById( 'submitButton' )
//     submitButton.onclick = submit

//     const resetButton = document.getElementById( 'resetButton' )
//     resetButton.onclick = reset
//   }

