//selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


//event listeners 
todoButton.addEventListener("click", addTodo); 


//Functions 
function addTodo(event) { 
    //Prevent form from submitting
    event.preventDefault(); 

    //Todo 
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 
    
}