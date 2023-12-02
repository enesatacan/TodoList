//Tüm elementleri seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBady = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];
runEvents();

function runEvents(){
    form.addEventListener("submit" ,addToDo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    document.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}
function addToDo(e){
    const InputText = addInput.value.trim();
    if(InputText==null || InputText==""){
        showAlert("warning","Lütfen Bir Görev Belirtiniz...")
    }
    else{
    //Arayüz Ekleme
        addToDoUI(InputText);
        addTodoToStorage(InputText);
        showAlert("success","Görev Eklendi...")
    }
    

    //Storage Ekleme
    e.preventDefault();
}
function addToDoUI(newTodo){
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>
*/
const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";
li.textContent = newTodo;

const a = document.createElement("a");
a.href = "#";
a.className = "delete-item";

const i = document.createElement("i");
i.className = "fa fa-remove";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

addInput.value = "";

}
function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}    
function checkTodosFromStorage (){
     if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message){
    /*<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>*/
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBady.appendChild(div);
    setTimeout(function(){
        div.remove();
    }, 2500);
}
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addToDoUI(todo);
    });
}
function removeTodoToUI(e){
    if(e.target.className === "fa fa-remove"){
        //Ekrandan Silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //Storege'dan Silme
        removeTodoToStorage(todo.textContent);
        showAlert("dark","ToDo Başarıyla Silindi...");
    }
}
function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item")
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
        });
    showAlert("success","Tüm Görevler Silindi");
    }
    else{
        showAlert("warning","Listede Tanımlı Görev Bulunamadı");
    }
}
function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                if(todo.setAttribute("style","display:block"));
            }
            else{
                todo.setAttribute("style","display:none!important");

            }
        });
    }
    else{

    }
}