import { Todo } from "./classes/todo.js";

//finding elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");




//createTodo()
const createTodo = (newTodo) => {
    const todoElement = document.createElement("li");
    todoElement.id = newTodo.todoId;
    todoElement.classList.add("li-style");

    todoElement.innerHTML =  
    `<span> ${newTodo.todoValue} </span>
    <span> <button class="btn" id="deleteButton" >
               <i class="fa fa-trash" > </i>
            </button>
     </span>`;

     todoLists.appendChild(todoElement);

     const deleteButton = todoElement.querySelector("#deleteButton");
     deleteButton.addEventListener("click", deleteTodo);
};
//deleteTodo()
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("Yeh,It's deleted!!" , "danger");

    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId != selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
};
//shuowMessage()
const showMessage = (text,status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    },1500)
};
//getTodosFromLocalStorage()
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
};






//addTodo()
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    //Unique id generate
    const todoId = Date.now().toString();

    //todo.js
    const newTodo = new Todo(todoId,todoValue);
    // console.log(new Todo);


    //create & show function call
    createTodo(newTodo);
    showMessage("Yeh,It's Added!!", "success");

    //adding todos in local storage
    const todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
};
//loadTodods()
const loadTodods = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo));
};
//add event listener
todoForm.addEventListener("submit" , addTodo );
window.addEventListener("DOMContentLoaded", loadTodods);

