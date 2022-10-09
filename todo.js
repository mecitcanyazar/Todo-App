// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners () {    // Tüm event Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e) {
   if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
    // Arayüzden Todo'ları Temizleme
    // todoList.innerHTML = ""; // Yavaş

   while(todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
   }


}   

function filterTodos (e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach((listItem)=>{
        const text  = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // "Murat.indexOf(Mu)" Mu,Murat dizesinde varsa indexini verir örneğin 0 .index şeklinde,yoksa -1 değerini verir.
            //Bulamadı
            listItem.setAttribute("style","display:none !important");
            // d flex display:none'ı ezdiği için görüntüleyememiştik bu yüzden important ile öne çıkardık.
        } else {
            listItem.setAttribute("style","display:block");
        }

    })  
}

function deleteTodo(e) { 

    if(e.target.className === "fa fa-remove") {
    //    <li class="list-group-item d-flex justify-content-between">
    //             Todo 1
    //             <a href = "#" class ="delete-item">
    //                 <i class = "fa fa-remove"></i>
    //             </a>
    //         </li>

        e.target.parentElement.parentElement.remove();
        // li elementine erişebilmek için 2 defa parent'ına gitmem lazım.Komple li'yi sileceğim çünkü.
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();

    todos.forEach((todo,index)=>{
        if(todo === deletetodo){
            todos.splice(index,1) // o elementin indexinden başlayarak 1 tane sil.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}



function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach((todo)=>{
        addTodoToUI(todo);
    })
}

function addTodo (e) {
    const newTodo = todoInput.value.trim();
    //trim() ile input alanına yazdığımız değerin başındaki ve sonundaki boşlukları trimliyoruz."      Mecit       " gibi.
    // console.log(newTodo);

    if(newTodo === ""){

        showAlert("danger","Lütfen bir todo girin...");
    }else {
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...")
    }
    
    
    
    e.preventDefault();
}

function getTodosFromStorage(){ // Storagedan Todoları Alma
    let todos ;
    
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
     else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoToStorage (newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
  
}

function showAlert(type,message) {
        //     <div class="alert alert-danger" role="alert">
        //        <strong>Oh snap!</strong> Change a few things up and try submitting again.
        //      </div>
    
    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;
    
    alert.textContent = message;
    // console.log(alert);
    firstCardBody.appendChild(alert);


    // setTimeout -----> alert 1 sn sonra kaybolsun.

    setTimeout(()=>{
        alert.remove();
    },1000);

}

function addTodoToUI(newTodo) { // String değerini list item olarak UI'ya ekleyecek.

        // <!-- <li class="list-group-item d-flex justify-content-between">
        //     Todo 1
        //     <a href = "#" class ="delete-item">
        //         <i class = "fa fa-remove"></i>
        //     </a>

        // </li>-->

// List Item Oluşturma
const listItem = document.createElement("li");
// Link oluşturma
const link = document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML= " <i class = 'fa fa-remove'></i>"

listItem.className= "list-group-item d-flex justify-content-between"
// Text Node Ekleme
listItem.appendChild(document.createTextNode(newTodo))
listItem.appendChild(link)

// Todo List'e List Item'ı Ekleme

todoList.appendChild(listItem)
todoInput.value = "";
}   