let tasks = [];
let filter = 'all';

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.title;
      if (task.completed) span.classList.add("completed");

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✓";
      completeBtn.onclick = () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.onclick = () => {
        tasks.splice(index, 1);
        renderTasks();
      };

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);
      list.appendChild(li);
    });
}

function addTask(event) {
  event.preventDefault();
  const input = document.getElementById("taskInput");
  const errorMsg = document.getElementById("errorMsg");
  const taskText = input.value.trim();

  if (!taskText) {
    errorMsg.textContent = "Task title cannot be empty.";
    return;
  }

  errorMsg.textContent = "";
  tasks.push({ title: taskText, completed: false });
  input.value = "";
  renderTasks();
}

function filterTasks(selected) {
  filter = selected;
  renderTasks();
}

renderTasks();
