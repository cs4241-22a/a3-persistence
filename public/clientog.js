const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let listItem = document.querySelector( '#listItem' )
    let dueDate  = document.querySelector( '#dueDate' )
    let priority = document.querySelector( '#priority' )

    let json = { 
                 username: "",
                 listItem: listItem.value,
                 dueDate: dueDate.value,
                 priority: priority.value.toLowerCase(),
                 urgent: 0,
                }
    body = JSON.stringify( json )

    fetch( '/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = await response.json() //wait until response
       console.log("is response")
       console.log(newData)
       newData.forEach(function(item) {
            update(item)
       })
    })
    return false
  }

  const modify = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let listItem = document.getElementById( 'modlistItem' )
    let dueDate  = document.getElementById( 'moddueDate' )
    let priority = document.getElementById( 'modpriority' )

    let json = { 
                 username: "",
                 listItem: listItem.value,
                 dueDate: dueDate.value,
                 priority: priority.value.toLowerCase(),
                 urgent: 0,
                }
    body = JSON.stringify( json )

    fetch( '/modify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = /*await*/ response.json() //wait until response
       console.log("is response")
       console.log(newData)
       newData.forEach(function(item) {
            update(item)
       })
    })
    return false
  }


  const update = function(newItem){
      const entry = document.getElementById("todoList")
      entry.innerHTML = "<tr><th>" + "Username" + "</th><th>" 
      + "Task" + "</th><th>" 
      + "Due Date" + "</th><th>"
      + "Priority" + "</th><th>" 
      + "Most Urgent" + "</th></tr>"

      let id = 0

      console.log("newItem")
      console.log(newItem)
      newItem.forEach((element, index) => {

        let newEntry = document.createElement("tr")
        newEntry.setAttribute("id", id)
        newEntry.setAttribute("value", false)

        let newEntryUser = document.createElement("td")
        newEntryUser.innerHTML = element.username

        let newEntryItem = document.createElement("td")
        newEntryItem.innerHTML = element.listItem

        let newEntryDate = document.createElement("td")
        newEntryDate.innerHTML = element.dueDate

        let newEntryPriority = document.createElement("td")
        newEntryPriority.innerHTML = element.priority

        let newEntryUrgent = document.createElement("td")
        newEntryUrgent.innerHTML = element.urgent
       
        newEntry.appendChild(newEntryUser)
        newEntry.appendChild(newEntryItem)
        newEntry.appendChild(newEntryDate)
        newEntry.appendChild(newEntryPriority)
        newEntry.appendChild(newEntryUrgent)

        let delcheck = document.createElement("INPUT")
        delcheck.setAttribute("type", "checkbox")
        delcheck.setAttribute("id", id)

        newEntry.appendChild(delcheck)

        console.log(newEntry)
        entry.appendChild(newEntry)

        id += 1
      })
     
      
      console.log(entry.innerHTML)

  }

  const changeDream = function(newText){
   const index = 0
    if(index > -1){
        const chg = document.getElementById(index);
        chg.innerHTML = newText;
        dreams[index] = chg;
        
    }
    console.log(dreams)
}

  const remove = function(e){
    e.preventDefault()

    //let listItem = document.querySelector( '#listItem' )
    //let dueDate  = document.querySelector( '#dueDate' )
    //let priority = document.querySelector( '#priority' )
    let json = { username: "",
                 listItem: "",
                 dueDate: "",
                 priority: "",
                 urgent: 0
                }
    body = JSON.stringify( json )

    fetch( '/delete', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body 
    })
    .then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = /*await*/ response.json() //wait until response
       newData.forEach(function(item) {
            update(item)
       })
       console.log(newData)
    })
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    const delButton = document.getElementById('delButton')
    delButton.onclick = remove
    const modButton = document.getElementById('modifySubmit')
    modButton.onclick = modify
  }