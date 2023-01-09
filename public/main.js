
const deleteBtn = document.querySelectorAll('.deleteButton');
const editBtn = document.querySelectorAll('.editButton');
const updateBtn = document.querySelector('.updateButton');

for (const button of deleteBtn) {
    button.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      fetch(`/books`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bookTitle: e.target.dataset.bookTitle,
            bookAuthor: e.target.dataset.bookAuthor,
            dateStarted: e.target.dataset.dateStarted,
            dateCompleted: e.target.dataset.dateCompleted,
            rating: e.target.dataset.rating,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then(() => {
          window.location.reload();
        });
    });
  }

  for (const button of editBtn) { 
    button.addEventListener('click', (e) => {     
        console.log(e.target.dataset);
        console.log(e.target.dataset.rating);
        console.log(e.target.dataset.rating);
  

      document.getElementById("oldBookTitle").value = e.target.dataset.booktitle; 
      document.getElementById('oldBookAuthor').value = e.target.dataset.bookauthor; 
      document.getElementById('oldDateStarted').value = e.target.dataset.datestarted; 
      document.getElementById('oldDateCompleted').value = e.target.dataset.datecompleted;
      document.getElementById('oldRating').value = e.target.dataset.rating; 


      document.getElementById('newBookTitle').value = e.target.dataset.booktitle; 
      document.getElementById('newBookAuthor').value = e.target.dataset.bookauthor; 
      document.getElementById('newDateStarted').value = e.target.dataset.datestarted; 
      document.getElementById('newDateCompleted').value = e.target.dataset.datecompleted;
      document.getElementById('newRating').value = e.target.dataset.rating; 
    
    
    }); 
  }

  updateBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    fetch('/books', { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
              bookTitle: document.querySelector('#newBookTitle').value, 
              bookAuthor: document.querySelector('#newBookAuthor').value, 
              dateStarted: document.querySelector('#newDateStarted').value, 
              dateCompleted: document.querySelector('#newDateCompleted').value, 
              rating: document.querySelector('#newRating').value, 
  
              oldBookTitle: document.querySelector('#oldBookTitle').value, 
              oldBookAuthor: document.querySelector('#oldBookAuthor').value, 
              oldDateStarted: document.querySelector('#oldDateStarted').value, 
              oldDateCompleted: document.querySelector('#oldDateCompleted').value, 
              oldRating: document.querySelector('#oldRating').value, 
      }), 
    }) 
    .then((res) => { 
      if (res.ok) return res.json(); 
    }) 
    .then(() => { 
      window.location.reload(); 
    }); 
  });