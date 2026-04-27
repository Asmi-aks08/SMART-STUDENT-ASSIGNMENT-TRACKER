//1
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.onload = renderTasks;

// Add task
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const status = document.getElementById("status").value;

    // Validation
    if (title === "" || dueDate === "") {
        alert("Please fill all fields!");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        dueDate,
        status
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    form.reset();
});

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        // Deadline alert
        const today = new Date().toISOString().split("T")[0];
        if (task.dueDate < today && task.status === "Pending") {
            alert(` Task "${task.title}" is overdue!`);
        }

        li.innerHTML = `
            <span class="${task.status === 'Completed' ? 'completed' : ''}">
                ${task.title} - ${task.dueDate} (${task.status})
            </span>
            <div class="actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newTitle = prompt("Edit Title", task.title);
    const newDate = prompt("Edit Due Date (YYYY-MM-DD)", task.dueDate);
    const newStatus = prompt("Edit Status (Pending/Completed)", task.status);

    if (newTitle && newDate && newStatus) {
        task.title = newTitle;
        task.dueDate = newDate;
        task.status = newStatus;

        saveTasks();
        renderTasks();
    }
}

//2
body {
  font-family: Arial;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
}

.container {
  background: white;
  padding: 20px;
  margin-top: 40px;
  width: 300px;
  border-radius: 10px;
}

input, select, button {
  width: 100%;
  margin: 5px 0;
  padding: 8px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task {
  background: #e3e3e3;
  margin: 5px 0;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  cursor: grab;
}

.delete {
  color: red;
  cursor: pointer;
}
