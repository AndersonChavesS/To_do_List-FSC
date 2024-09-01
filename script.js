const addTaskButton = document.querySelector('.new-task-button');
const inputElement = document.querySelector('.new-task-input');

const validateInput = () => inputElement.value.trim().lenght > 0;
const handleAddTask = () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    return inputElement.classList.add('error');
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
