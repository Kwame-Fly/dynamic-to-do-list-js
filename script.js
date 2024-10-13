document.addEventListener('DOMContentLoaded', () => {
   
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        // Get and trim the task input
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // Add class for styling

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Add class for styling

        // Set up the remove button's onclick event
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the li and the li to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

// Initialize an empty array to hold tasks
let tasks = [];

// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.textContent = task;

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTask(task, listItem);
    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();
    
    if (taskValue) {
        tasks.push(taskValue); // Add to the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        addTaskToDOM(taskValue); // Add to the DOM
        taskInput.value = ''; // Clear the input field
    }
}

// Function to remove a task
function removeTask(task, listItem) {
    tasks = tasks.filter(t => t !== task); // Remove from the tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
    listItem.remove(); // Remove from the DOM
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks from Local Storage

    // Add task button click event
    const addTaskButton = document.getElementById('add-task-button');
    addTaskButton.addEventListener('click', addTask);
});
