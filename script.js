// ========================================
// Select HTML Elements
// ========================================

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const priorityInput = document.getElementById("priority");

const taskList = document.getElementById("taskList");

const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");

const filterSelect = document.getElementById("filterSelect");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

const themeBtn = document.getElementById("themeBtn");


// ========================================
// Tasks Array
// ========================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ========================================
// Add Task
// ========================================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    const priority = priorityInput.value;


    // Validation

    if (taskName === "") {

        alert("Please enter a task.");

        return;
    }


    // Create task object

    const task = {

        id: Date.now(),

        name: taskName,

        priority: priority,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Save to LocalStorage

    saveTasks();


    // Clear input

    taskInput.value = "";


    // Display tasks

    displayTasks();

});


// ========================================
// Display Tasks
// ========================================

function displayTasks() {

    taskList.innerHTML = "";


    const searchValue =
        searchInput.value.toLowerCase();


    const filterValue =
        filterSelect.value;


    // Filter tasks

    const filteredTasks = tasks.filter(function (task) {

        const matchesSearch =
            task.name
                .toLowerCase()
                .includes(searchValue);


        const matchesFilter =
            filterValue === "all" ||
            (filterValue === "completed" && task.completed) ||
            (filterValue === "pending" && !task.completed);


        return matchesSearch && matchesFilter;

    });


    // Empty message

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create task cards

    filteredTasks.forEach(function (task) {

        const taskCard =
            document.createElement("div");

        taskCard.classList.add("task-card");


        taskCard.innerHTML = `

            <div class="task-content">

                <h3 class="${task.completed ? "completed" : ""}">
                    ${task.name}
                </h3>

                <p>
                    Priority:
                    ${task.priority}
                </p>

                <span class="priority">
                    ${task.completed ? "Completed" : "Pending"}
                </span>

            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });


    updateStatistics();

}


// ========================================
// Complete / Undo Task
// ========================================

function toggleTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });


    if (task) {

        task.completed = !task.completed;

    }


    saveTasks();

    displayTasks();

}


// ========================================
// Delete Task
// ========================================

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// ========================================
// Search
// ========================================

searchInput.addEventListener(
    "input",
    displayTasks
);


// ========================================
// Filter
// ========================================

filterSelect.addEventListener(
    "change",
    displayTasks
);


// ========================================
// Update Statistics
// ========================================

function updateStatistics() {

    const total = tasks.length;


    const completed =
        tasks.filter(function (task) {

            return task.completed;

        }).length;


    const pending = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}


// ========================================
// Local Storage
// ========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ========================================
// Dark Mode
// ========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeBtn.textContent = "Light Mode";

    } else {

        themeBtn.textContent = "Dark Mode";

    }

});


// ========================================
// Initial Display
// ========================================

displayTasks();