const taskText = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const clearButton = document.getElementById('clearButton');
const doneTasks = document.getElementById('done');
const onprogressTasks = document.getElementById('onprogress');

let tasks = [];

addTaskButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearTasks);

function addTask() {
    const taskName = taskText.value.trim();
    if (taskName === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        isCompleted: false
    };

    tasks.push(task);
    taskText.value = '';
    displayTasks();
}

function displayTasks() {
    doneTasks.innerHTML = '';
    onprogressTasks.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task list-group-item';

        const label = document.createElement('label');
        label.className = 'task-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isCompleted;
        checkbox.className = 'task-checkbox';
        checkbox.style.cursor = 'pointer';
        checkbox.onchange = () => {
            task.isCompleted = checkbox.checked;
            displayTasks();
        };

        const taskLabel = document.createElement('span');
        taskLabel.textContent = task.name;
        if (task.isCompleted) {
            taskLabel.classList.add('completed-task');
        } else {
            taskLabel.classList.remove('completed-task');
        }

        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '❌';
        deleteIcon.className = 'delete-icon';
        deleteIcon.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            displayTasks();
        };

        label.appendChild(checkbox);
        label.appendChild(taskLabel);
        li.appendChild(label);
        li.appendChild(deleteIcon);

        if (task.isCompleted) {
            doneTasks.appendChild(li);
        } else {
            onprogressTasks.appendChild(li);
        }
    });
}

function clearTasks() {
    tasks = [];
    displayTasks();
}