        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');

        document.addEventListener('DOMContentLoaded', loadTasks);

        addTaskBtn.addEventListener('click', addTask);

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateLocalStorage();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);

            taskInput.value = '';

            updateLocalStorage();
        }

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    updateLocalStorage();
                });

                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }

        function updateLocalStorage() {
            const tasks = [];
            document.querySelectorAll('#taskList li').forEach(li => {
                tasks.push(li.textContent.replace('Delete', '').trim());
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }