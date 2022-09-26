const form = document.getElementById('form')
form.addEventListener("submit", submit)
form.onload = getDataUpdateTable()

async function getDataUpdateTable() {
    try {

        const responseData = await getData()

        await updateTable(responseData)

    } catch(error) {
        console.error(error)
}}

async function getData() {
    const response = await fetch( '/data', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    return response.json()
}

async function submit( e ) {
    e.preventDefault()

    const formElement = e.currentTarget;

    try {
        const formData = new FormData(formElement)

        await postFormDataAsJSON(formData).then(getDataUpdateTable())
        
    } catch(error) {
        console.error(error)
    }}

async function deletePokemon( data ) {

    try {

        await deleteData(data).then(getDataUpdateTable())

    } catch(error) {
        console.error(error)
}}

async function postFormDataAsJSON(formData) {
    const plainFormData = Object.fromEntries(formData.entries())
        body = JSON.stringify(plainFormData)

    const response = await fetch( '/submit', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body 
      })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}

async function deleteData(data) {
    const body = JSON.stringify(data)
    const response = await fetch( '/delete', {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
      })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}

async function updateTable(data) {
    const table = document.querySelector('table')
    let tbodyOld = document.querySelector('tbody')
    let tbodyNew = document.createElement('tbody')

    table.replaceChild(tbodyNew, tbodyOld)

    if (data.length > 0) {
        data.forEach(element => {
            let row = document.createElement('tr')
    
            let name = document.createElement('td')
            name.innerText = element.name
    
            let description = document.createElement('td')
            description.innerText = element.description
    
            let type1 = document.createElement('td')
            type1.innerText = element.type1
    
            let type2 = document.createElement('td')
            type2.innerText = element.type2
    
            let weaknesses = document.createElement('td')
            weaknesses.innerText = element.weaknesses
    
            let resistances = document.createElement('td')
            resistances.innerText = element.resistances
    
            let immunities = document.createElement('td')
            immunities.innerText = element.immunities
    
            row.append(name, description, type1, type2, weaknesses, resistances, immunities)
            row.addEventListener("click", function() {
                deletePokemon(element)
            })
            tbodyNew.append(row)
        });
    }
}