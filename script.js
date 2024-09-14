// script.js
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = todoInput.value.trim();
        if (taskText) {
            addTask(taskText);
            todoInput.value = ''; // Clear input field
        }
    });

    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const listItem = event.target.parentElement;
            removeTask(listItem);
        } else if (event.target.classList.contains('edit-btn')) {
            const listItem = event.target.parentElement;
            editTask(listItem);
        } else if (event.target.classList.contains('task-text')) {
            const listItem = event.target.parentElement;
            toggleTaskCompletion(listItem);
        }
    });

    function addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(listItem);
        saveTasks();
    }

    function removeTask(listItem) {
        todoList.removeChild(listItem);
        saveTasks();
    }

    function editTask(listItem) {
        const taskText = listItem.querySelector('.task-text');
        const newTaskText = prompt('Edit your task:', taskText.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskText.textContent = newTaskText.trim();
            saveTasks();
        }
    }

    function toggleTaskCompletion(listItem) {
        listItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#todo-list .todo-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            if (task.completed) {
                listItem.classList.add('completed');
            }
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    }
});
