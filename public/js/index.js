
const http = (url, method = 'get', config = {}) => fetch(url, {
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    ...config
})


// ============================------- Creating note ------=================================

const todoCreateInput = document.querySelector('#create-todo-title')
const todoCreateBtn = document.querySelector('#create-todo-btn')

if(todoCreateBtn){
    todoCreateBtn.addEventListener('click', createTodo)
}

async function createTodo () {

    const title = todoCreateInput.value

    if(!title){
        alert('Write down something!')
    }

    const response = await http('/api/todos/create', 'post', {body: JSON.stringify({title})})

    if(!response.ok){
        alert('Something is wrong!')
        return
    }

    window.location.reload()
}


// =====================----- Editing note  ------============================

const editBtns = document.querySelectorAll('.show-edit-modal');
const editTodoTitle = document.querySelector('#edit-todo-title')

if(editBtns.length){
    editBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {

            const item = e.target.closest('.todos__item')

            if(!item){
                return false
            }

            const title = item.querySelector('.todo-title') ? item.querySelector('.todo-title').value : ''

            if(editTodoTitle){
                editTodoTitle.value = title
            }

            const todoId = item.id

            await editTodo(todoId)
        })
    })
}

async function editTodo (todoId) {

    const editBtn = document.querySelector('#edit-todo-btn')

    editBtn.addEventListener('click', async () => {

        if(!editTodoTitle){
            return false
        }

        const title = editTodoTitle.value

        const response = await http(`/api/todos/edit/${todoId}`, 'put', {body: JSON.stringify({title})})

        if(response.ok){
           window.location.reload()
        }
    })
}


// =====================----- Deleting note  ------============================

const deleteBtns = document.querySelectorAll('.delete-todo-btn');

if(deleteBtns.length){
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {

            const item = e.target.closest('.todos__item')

            if(!item){
                return false
            }

            const todoId = item.id

            await deleteTodo(todoId)
        })
    })
}

async function deleteTodo (todoId) {

    const response = await http(`/api/todos/delete/${todoId}`, 'delete')

    if(!response.ok){
        alert('Something is wrong!')
        return
    }

    window.location.reload()
}