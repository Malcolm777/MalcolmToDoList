//selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners 
document.addEventListener('DOMContentLoaded', getTodos); //if everything is loaded, run getTodos 
todoButton.addEventListener("click", addTodo); 
todoList.addEventListener('click', deleteCheck); 
filterOption.addEventListener('input', filterTodo);


//Functions 
function addTodo(event) { 
    //Prevent form from submitting
    event.preventDefault(); 

    //Todo 
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 


    //Add new todo to the list then append to the div 
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 

    //Add TODO  to local storage 
    saveLocalTodos(todoInput.value);

    //Check mark button for adding a task 
    const completedButton = document.createElement('button'); 
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn'); 
    todoDiv.appendChild(completedButton); 

    //Trash button for inner HTML 
    const trashButton = document.createElement('button'); 
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn'); 
    todoDiv.appendChild(trashButton);

    //adding the div with the list item and 2 buttons to the list 
    todoList.appendChild(todoDiv); 

    //Clear todo input value 
    todoInput.value = ""; 
}

function deleteCheck(e){ 
    const item = e.target; 
    //DELETE TODO 
    if(item.classList[0] === 'trash-btn'){ 
        const todo = item.parentElement;
        

        //Animation - waits til transition finishes to execute this function
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove(); 
        });
    }

    //Check Mark 
    if(item.classList[0] === 'complete-btn'){ 
        const todo = item.parentElement; 
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {


    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        if (todo.nodeType === Node.ELEMENT_NODE) {
            switch(e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        todo.style.display = 'none';
                    }
                    else{
                        todo.style.display = "flex";
                    }
                    break;
            }
        }
    }) 
}

function saveLocalTodos(todo){ 
    //CHECK -- is the todo item already in there? 
    let todos; 
    if(localStorage.getItem('todos') === null) { 
        todos = []; //create empty array 
    }else { 
        todos = JSON.parse(localStorage.getItem('todos'));
        //get todos from localStorage 
    }

    //whatever is passed in is used in the array 
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() { 
    let todos; 
    if(localStorage.getItem('todos') === null) { 
        todos = []; //create empty array 
    }else { 
        todos = JSON.parse(localStorage.getItem('todos'));
        //get todos from localStorage 
    }

    //getting the list items 
    todos.forEach(function(todo){ 
        const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 


    //Add new todo to the list then append to the div 
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 

    //Check mark button for adding a task 
    const completedButton = document.createElement('button'); 
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn'); 
    todoDiv.appendChild(completedButton); 

    //Trash button for inner HTML 
    const trashButton = document.createElement('button'); 
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn'); 
    todoDiv.appendChild(trashButton);

    //adding the div with the list item and 2 buttons to the list 
    todoList.appendChild(todoDiv); 
    })

}

function removeLocalTodos(todo) { 
    let todos; 
    if(localStorage.getItem('todos') === null) { 
            todos = []; //create empty array 
        }else { 
            todos = JSON.parse(localStorage.getItem('todos'));
            //get todos from localStorage 
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1); 
        localStorage.setItem('todos', JSON.stringify(todos));
}