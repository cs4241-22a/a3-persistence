
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

    newCell.appendChild(newSong)
    artistCell.appendChild(newArtist)
    durationCell.appendChild(newDuration)
    albumCell.appendChild(newAlbum)
    playlistDurationCell.appendChild(newPlaylistDuration)

    let tableCells = document.getElementsByTagName("td")
    for(let i=0; i<tableCells.length; i++)
    {
      tableCells[i].setAttribute("contenteditable", true)
    }

    // Add specific update and remove buttons
    const updateCell = newRow.insertCell()
    const removeCell = newRow.insertCell()
    let newUpdate = document.createElement("button")
    let newRemove = document.createElement("button")
    newUpdate.textContent = 'Update Song'
    newRemove.textContent = 'Remove Song'

    newUpdate.addEventListener("click", updateSong => {
      updateSong.preventDefault()

      console.log("getting current row values")
      console.log(newSong)
      let updatedData = []
      updatedData[0] = newSong.textContent
      updatedData[1] = newArtist.textContent
      updatedData[2] = newDuration.textContent
      updatedData[3] = newAlbum.textContent
      updatedData[4] = newPlaylistDuration.textContent

      console.log(updatedData)

      console.log("about to fetch update")
      fetch( '/update', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ newsong: updatedData, rowNum: newRow.rowIndex})
      })
      .then( res => res.json() , console.log("finishing update client"))
    })

    newRemove.addEventListener("click", deleteSong => {
      deleteSong.preventDefault()

      let td = event.target.parentNode
      let tr = td.parentNode
      let t = tr.parentNode
      t.removeChild(tr)
      console.log("just deleted row - also about to fetch")

      fetch( '/delete', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ newsong: songData})
      })
      .then( res => res.json() , console.log("finishing delete fetcher"))
    })
    
    updateCell.appendChild(newUpdate)
    removeCell.appendChild(newRemove)
  
    console.log("just added a song to the playlist")
  }



songForm.onsubmit = function(e)
{
    e.preventDefault()

    console.log("in script submit function")

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

    fetch( '/submit', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ "newsong":songData})
    })
    .then( res => res.json() )
    .then( json => console.log( json ) )
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
