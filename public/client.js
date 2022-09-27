window.addEventListener('load', () => {
  const form = document.querySelector("#new-task-form")
  const input = document.querySelector("#new-task-input")
  const list = document.querySelector("#task-list")
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const task = input.value
    
    // user must type something in form input
    if (!task) {
      alert("Please fill out the task")
      return
    }
    
    // create a new list item with content from 'input'
    
    
    
    
    
    
    // TODO~~~~~~~~~~~~~~~~~~~~~ POST server with new task
    //    (may be fine leaving form as POST action)
    
  })
  
})

