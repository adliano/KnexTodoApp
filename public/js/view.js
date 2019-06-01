window.onload = function () {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = document.querySelector('input.new-item')
  // Our new todos will go inside the todoContainer
  var $todoContainer = document.querySelector('#todo-container')

  // Adding event listeners for deleting, editing, and adding todos
  $todoContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'BUTTON') {
      if (event.target.matches('button.delete')) {
        // DELETE BTN
        event.stopPropagation()
        let id = event.target.dataset.id

        fetch('/api/todos/' + id, {
          method: 'DELETE'
        })
          .then(function (data) {
            getTodos()
          })
      } else if (event.target.matches('button.complete')) {
        // DONE BTN
        event.stopPropagation()
        let tParent = event.target.parentNode
        let content = tParent.querySelector(`todoText${tParent.dataset.todo}`)
        let todo = {
          id: tParent.dataset.todo,
          completed: !(parseInt(tParent.dataset.completed)),
          text: content
        }
        updateTodo(todo)
      } else if (event.target.matches('button.edit')) {
        let tParent = event.target.parentNode
        let content = tParent.querySelector('input').value.trim()
        let todo = {
          id: tParent.dataset.todo,
          completed: !(parseInt(tParent.dataset.completed)),
          text: content
        }

        updateTodo(todo)
      }
    } else if (event.target.nodeName === 'SPAN' && event.target.matches('.todo-text')) {
      editTodo(event)
    }
  })

  $todoContainer.addEventListener('blur', function (event) {
    if (event.target.nodeName === 'INPUT' && event.target.matches('.edit')) {
      // cancelEdit(event)
      let tParent = event.target.parentNode
      let content = event.target.value.trim()
      let todo = {
        id: tParent.dataset.todo,
        completed: !(parseInt(tParent.dataset.completed)),
        text: content
      }

      updateTodo(todo)
    }
  })

  $todoContainer.addEventListener('keyup', function (event) {
    if (event.target.nodeName === 'LI' && event.target.matches('.todo-list')) {
      finishEdit(event)
    }
  })

  document.querySelector('#todo-form').addEventListener('submit', insertTodo)

  // Our initial todos array
  var todos = []

  // Getting todos from database when page loads
  getTodos()

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $todoContainer.innerHTML = ''

    var rowsToAdd = []

    for (var i = 0; i < todos.length; i++) {
      rowsToAdd.push(createNewRow(todos[i]))
    }
    $todoContainer.insertAdjacentHTML('afterbegin', rowsToAdd)
  }

  // This function grabs todos from the database and updates the view
  function getTodos() {
    fetch('/api/todos')
      .then(results => results.json())
      .then(function (data) {
        todos = data
        console.log('get all data', todos)
        initializeRows(todos)
      })
  }

  // This function deletes a todo when the user clicks the delete button
  /** function deleteTodo (event) {
    event.stopPropagation()
    var id = event.target.dataset.id

    fetch('/api/todos/' + id, {
      method: 'DELETE'
    }).then(function (data) {
      getTodos()
    })
  }

  // Toggles complete status
  function toggleComplete (event) {
    event.stopPropagation()
    var todo = event.target.parent().data('todo')
    todo.completed = !todo.completed
    updateTodo(todo)
  }
// This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit (event) {
    var currentTodo = event.target.dataset.todo
    if (currentTodo) {
      event.target.children.style.visibility = 'hidden'
      event.target.children('input.edit').value = currentTodo.text
      event.target.children('span').style.disolay = ''
      event.target.children('button').style.disolay = ''
    }
  }
 */

  // This function handles showing the input box for a user to edit a todo
  function editTodo(event) {
    let _parent = event.target.parentNode
    const currentTodo = {
      id: _parent.dataset.todo,
      text: event.target.textContent,
      completed: _parent.dataset.completed
    }

    for (let child of _parent.children) {
      if (child.style) {
        child.style.visibility = 'hidden'

        if (child.matches('input.edit')) {
          child.value = currentTodo.text.trim()
          child.style.visibility = 'visible'
          child.focus()
        }
        if (child.matches('button.edit')) {
          child.style.visibility = 'visible'
        }
      }
    }
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedTodo = event.target.dataset.todo
    if (event.which === 13) {
      updatedTodo.text = event.target.children('input').value.trim()
      event.target.blur()
      updateTodo(updatedTodo)
    }
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    fetch('/api/todos/' + todo.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    }) // On success, run the following code
      .then(function (data) {
        // Log the data we found
        console.log(data)
        getTodos()
      })
  }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    let textDecoration = todo.completed ? 'line-through' : 'none'

    let newInputRow = `
        <li class='list-group-item todo-item' data-completed='${todo.completed}' data-todo='${todo.id}'>
        <span class='todo-text' id='todoText${todo.id}' style='text-decoration:${textDecoration}'>${todo.text}</span>
        <input type='text' class='edit' style='visibility: hidden;'>
        <button type="button" data-id='${todo.id}' style='visibility: hidden;' class="edit btn btn-secondary">Save</button>
        <button type="button" data-id='${todo.id}' class="delete btn btn-danger btn-lg">Remove</button>
        <button type="button" data-completed='${todo.completed}' data-id='${todo.id}' class="complete btn btn-primary btn-lg">Done</button>
        </li>`

    return newInputRow
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault()
    var todo = {
      text: $newItemInput.value.trim(),
      completed: 0
    }

    // Send the POST request.
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    })
      // On success, run the following code
      .then(function (data) {
        // Log the data we found
        console.log(data)
        getTodos()
      })

    $newItemInput.value = ''
  }
}
