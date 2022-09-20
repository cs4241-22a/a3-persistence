const form = document.getElementById('form')
form.addEventListener("submit", submit)

async function submit( e ) {
    e.preventDefault()

    const formElement = e.currentTarget;

    try {
        const formData = new FormData(formElement)

        const responseData = await postFormDataAsJSON(formData)

        await updateTable(responseData)

    } catch(error) {
        console.error(error)
    }}

async function deletePokemon( name ) {

    try {

        const responseData = await deleteData(name)

        await updateTable(responseData)

    } catch(error) {
        console.error(error)
}}

async function postFormDataAsJSON(formData) {
    const plainFormData = Object.fromEntries(formData.entries())
        body = JSON.stringify(plainFormData)

    const response = await fetch( '/submit', {
        method:'POST',
        body: body 
      })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    const responseData = response.json()
    
    return responseData
}

async function deleteData(name) {
    const response = await fetch( '/delete', {
        method:'DELETE',
        body: name
      })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    const responseData = response.json()
    return responseData
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
                deletePokemon(element.name)
            })
            tbodyNew.append(row)
        });
    }
}