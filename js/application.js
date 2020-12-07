// Get Elements
var btnAddTask = document.querySelector('#btnAddTask');
var btnRemoveTask = document.querySelectorAll('.btnDelete');
var contentTask = document.querySelector('#taskInput');
var ulList = document.querySelector('#taskUL');

// Create Elements Class
var checkbox = 'checkbox';
var checked = 'checked';
var lineThrough = 'lineThrough';

// Create Variable Params
var taskList;

// Get LocalStorage Data
var data = localStorage.getItem('taskList');

// Default Functions to Load
if(data) {
  taskList = JSON.parse(data);
  id = taskList.length - 1;
  localStorageLoad(taskList);
} else {
  taskList = [];
  id = 0;
};

// Specific Elements
var btnChangeTask = document.querySelectorAll('#doneTask');

// Functions

function addTaskList() {
  var itemTask = contentTask.value;
  
  if (itemTask.length > 0) {
    createTask(itemTask);
    localStorageSave();
  } else {
    alert('Favor digitar alguma tarefa para prosseguir');
  };
};

function createTaskHTML(itemTask) {

  var liItem = document.createElement('li'); //cria a tag LI para formar a lista
  var aItem = document.createElement('a');
  var iconItem = document.createElement('i');
  var pItem = document.createElement('p'); //cria a tag SPAN para conter a descrição da tarefa
  var deleteItem = document.createElement('button'); // criar a tag <button> para remoção da tarefa

  var listContent = ulList.appendChild(liItem); //adiciona o LI como elemento filho de UL

  // Set ID to Elements
  iconItem.id = 'doneTask iconId' + itemTask.id;
  pItem.id = 'taskItem taskId' + itemTask.id;
  deleteItem.id = 'btnDelete deleteId' + itemTask.id;

  // Set Todo Buttons Event
  iconItem.addEventListener('click', () => updateTodo(itemTask.id));
  deleteItem.addEventListener('click', () => deleteTodo(itemTask.id));

  // Set Class to Elements
  liItem.className = 'item';
  liItem.data = itemTask.id;

  if (itemTask.done === true){
    iconItem.className = 'checked';
    pItem.className = 'lineTrough';    
  } else {
    iconItem.className = 'checkbox';
    pItem.className = 'taskitem';    
  }

  deleteItem.className = 'btnDelete';

  // Set Content to Elements
  pItem.textContent = itemTask.name; //insere o conteudo do input para criar a tarefa
  deleteItem.textContent = 'x';

  // Create Elements on HTML
  liItem.appendChild(iconItem);
  liItem.appendChild(pItem);
  liItem.appendChild(deleteItem);
};

function createTask(itemTask) {
  taskList.push({
    id : id,
    done : false,
    name : itemTask
  });
  id++;
  render();
  localStorageSave();
};

function localStorageSave() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

function localStorageLoad() {
  if (JSON.parse(localStorage.getItem('taskList'))) {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  
  render();
  };
};

function render() {
  while(ulList.hasChildNodes()) {
    ulList.removeChild(ulList.childNodes[0]);
  }

  taskList.forEach(item => createTaskHTML(item));
};

function removeTaskList(index){
  console.log(index);
  taskList.splice(index, 1);
};

function updateTodo(index) {
  taskList = taskList.map(item => {
    console.log(index);
    if (item.id == index) {
      console.log(item);
      const isTaskDone = !item.done;

      return {
        ...item,
        done: isTaskDone,
      }
    } else {
      return item;
    }
  });

  render();
  localStorageSave();
  console.log(taskList);
};

function deleteTodo(index) {
  taskList = taskList.filter(task => task.id !== index);
  render();
  localStorageSave();
};

function clearInputAfterClick() {
  contentTask.value = '';
};

btnAddTask.addEventListener('click', addTaskList);
btnAddTask.addEventListener('click', clearInputAfterClick);