document.addEventListener("DOMContentLoaded",()=>{
    const todoInput=document.getElementById("todo-input");
    const addBtn=document.getElementById("add-btn");
    const todoList=document.getElementById("todo-list");
//localStorage-Browser ke andar data save karni ki facility.
//getItem()-todos naam ka stored data retrieve karta hai.kekin cocal Storage data ki string ke form me store karta hai.
//JSON.parse()-Store JSON string ko javaScript object/array me convert karta hai.
//importrant flow-> JSON.stringify()->javaScript->JSON string-> JSON.parse()->JSON String->JavaScript
//[]Agar  LocalStorage me todos nahi hai,to:return kare ga null and agar null ||[] ishliye tdos empty array hoga
    let todos=JSON.parse(localStorage.getItem("todos")) || [];
    //Render javascript ke current dataq ko HTML Screen par display karta h
    function renderTodos(){
        //Todo list ke andar ke existing HTML delete kar deta hia. kyii hum list ko fresh data ke according dobara create karenge.
        todoList.innerHTML="";
        //todos array ke har element par loop chalega
        //todo-current object
        //index-current array position
        todos.forEach((todo, index)=>{
            //javaScript dynamically ek <li> element create karta hai.
            const li=document.createElement("li");
            //Ek<span> element create hota hai.
            const taskText=document.createElement("span");
            //textContent->Element ke andar text set karta hai
            taskText.textContent=todo.text;
        //Ek<div> create hota hai.
            const actionsDiv=document.createElement("div");
            actionsDiv.className="actions";
            //Backticks(`) ka use karke multiple-line HTML STRING likh sakte hain
            actionsDiv.innerHTML=`
            //Ek Edit button create hoga
            //*- data Attribute ye HTML5 custom data attribute hai
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
            `;//taskText ko <li> ke andar add karta hai
            li.appendChild(taskText);
            //action iv ko bhi<li> ke andar add karta hai.
            li.appendChild(actionsDiv);
            //Finally <li> ko main todo list me add karta hai
            todoList.appendChild(li);  
        });


    }
  
    //CRUD:CREATE
    //Naya task add karne ke liye function.
    function addTodo(){
        //value-Input box ke andar user ne kya likha hai,wo deta hai
        //Extra spaces remove karta hai.
        const text=todoInput.value.trim();
        //check karta hai ki user ne empty inut diya hai ya nahi
        if(text===""){
            //Brower alert show karega
            alert("please enter a task!");
            //Function ko whai stop kar deta hai
            return;
        }
        //ye bahut imortant hai.->push() array ke end me new item add karta  hai
        todos.push({text:text,completed:false});
        //Naya Todo browser localStorage me save karta hai
        updateLocalStorage();
        //Array me new todo add hone ke baad screen ko refresh karta hai
        renderTodos();
        //Input box ko empty kar deta hai
        todoInput.value="";

    }
    //todoList par click event listener lagaya gaya hai
    //har Edit/Delete button par alag listener lagane ke baja parent todoList par ek listener 
    //lagaya hai is technique ko Event Delegation kehte hain
    todoList.addEventListener("click",(e)=>{
      //  e.traget batata hai ki exactly kish element par click hua 
        if(e.target.classList.contains("delete-btn")){
            //button se data-index value nikalta hai.
const index=e.target.getAttribute("data-index");
//Delete function ko index pass karta hai
deleteTodo(index);
        }
        //check karta hai ki clicked button Edit button hai ya nahi.
        //Edit button ka index niklata hai
        if(e.target.classList.contains("edit-btn")){
            const index=e.target.getAttribute("data-index");
            //edit function call karta h 
            editTod(index);
        } 
    });
    //Existing Todo ko edit krne ka function
    function editTod(index){
        //Array ke given index se current task text nikalta hai
        const currentText=todos[index].text;
        //browser ek input dialg open karenga
        const newText=prompt("Edit your taks:",currentText);
        //newText !-null->user ne cancle nahi dabaya
        //newText.trim() !==""->user ne empty text nai diya
        if(newText !==null && newText.trim() !==""){
            //Older task ko new task se replace karta hai
            todos[index].text=newText.trim();
            //Udated Todo LocalStorage me save hota hai
            updateLocalStorage();
            //Screen ko updae data ke acccording refresh kara hai
            renderTodos();
        }
    }//Delete karne ka function
    function deleteTodo(index){
        //ue array se item remvoe karta hai
        todos.splice(index,1);
        //Delete ke baad updated array Local Storage me save hota hai
        updateLocalStorage();
        //Delete item screen se bhi remove ho jata hai.
        renderTodos();
    }
    //ye ek resuable function hai.
    // iska kaam:Current todos arrayko lcoalStorage me save karna
    function updateLocalStorage(){
        //localStorage sirf strings store kara hai
        //Lekin todos ek javaScript array hai
        //array ko JSON string me covert karta hai
        //us string ko save karta hai
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    //jab Add button click hoga:function execure hoga
    addBtn.addEventListener("click",addTodo);
    //likhna hai
    //input box me keyboard key press hone par eenttriger hoaga
    todoInput.addEventListener("keypress",(e)=>{
        //because yahan fucntion ko callback ke form me pass kar rahe hain
        //kya user ne Enter key presski exute hoga islye use button ckickkiya nina Enter se todo add kar sakst hai
        if(e.key==="Enter") addTodo();
    });
    renderTodos();
});
