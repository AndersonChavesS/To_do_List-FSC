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
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currentTaskBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskBeingClicked) {
      taskItemContainer.remove();
    }
  }
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currentTaskBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskBeingClicked) {
      task.firstChild.classList.toggle('completed');
    }
  }
};

const handleInputChange = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    return inputElement.classList.remove('error');
  }
};
// Events
addTaskButton.addEventListener('click', () => handleAddTask());
inputElement.addEventListener('change', () => handleInputChange());
