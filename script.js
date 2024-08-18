const input = document.querySelector('.taskInput');
const button = document.querySelector('.btnAdd');
const ul = document.querySelector('.taskList');


function exportTasks() {
    const tasks = [];
    ul.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function importTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.style.marginRight = '10px';
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span); 

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        li.appendChild(deleteButton);

        ul.appendChild(li);
    });
}

importTasks();

button.addEventListener('click', () => {
    const taskText = input.value;
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = taskText;
        span.className = 'task-text';
        li.appendChild(span);

        const delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        li.appendChild(delButton);

        ul.appendChild(li);
        input.value = '';

        exportTasks();
});

ul.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
        exportTasks();
    } else if (e.target.type === 'checkbox') {
        exportTasks();
    } 
} );

ul.addEventListener('change', e => {
        exportTasks();
});
