const addTaskButton = document.querySelector('.new-task-button');
const inputElement = document.querySelector('.new-task-input');
const tasksContainer = document.querySelector('.tasks-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    return inputElement.classList.add('error');
  }

  const taskItemContainer = document.createElement('div');
  taskItemContainer.classList.add('task-item');

  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;
  taskContent.addEventListener('click', () => handleClick(taskContent));

  const deleteItem = document.createElement('i');
  deleteItem.classList.add('far');
  deleteItem.classList.add('fa-trash-alt');
  deleteItem.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  tasksContainer.appendChild(taskItemContainer);
  inputElement.value = '';
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currentTaskBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskBeingClicked) {
      taskItemContainer.remove();
    }
  }
  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currentTaskBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskBeingClicked) {
      task.firstChild.classList.toggle('completed');
    }
  }
  updateLocalStorage();
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const IsCompleted = content.classList.contains('completed');
    return { description: content.innerText, IsCompleted };
  });
  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.description;
    if (task.IsCompleted) {
      taskContent.classList.add('completed');
    }
    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');
    deleteItem.addEventListener('click', () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
  }
};

const handleInputChange = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    return inputElement.classList.remove('error');
  }
};
refreshTasksUsingLocalStorage();

addTaskButton.addEventListener('click', () => handleAddTask());
inputElement.addEventListener('change', () => handleInputChange());
