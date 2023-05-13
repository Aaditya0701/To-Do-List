import LS from './ls.js';

function UI(){}
  
const ls = new LS();
  
UI.prototype.showAllTask = function (){
  let tasks = ls.fetchtask();
  let newHtml = '';
  tasks.forEach((taks) => {
    newHtml += `
    <div class="task" ${taks.isComplete ? "completed" : "''"}
    data-createdat="${taks.id}">
    <div class="task__details">
      <input type="checkbox" class="task-check" 
      ${taks.isComplete ? 'cheched' : ''} />
      <label class="task-title">${taks.title}</label>
    </div>

    <div class="task__op">
      <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
      <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
    </div>
    </div>
     `;
  });

  //adding upper class to upper div tag of index.html
  document.querySelector('.task-list').innerHTML = newHtml;

}
  

 UI.prototype.addToUI = function(task){
     
  ls.storetask(task);

    let newHtml = `<div class="task" data-createdat="${task.id}">
      <div class="task__details">
        <input type="checkbox" class="task-check" />
        <label class="task-title">${task.title}</label>
      </div>

      <div class="task__op">
        <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
        <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
      </div>
     </div>`;

     document.querySelector('.task-list').insertAdjacentHTML('afterbegin',newHtml);
}

UI.prototype.resetform =function(){
    document.querySelector('#newtaskID').value = '';
}

    
UI.prototype.deletetask = function(e){
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdat;
  ls.deletetask(id);
  // console.log(task.dataset.createdat);
  // console.log(task);
  task.remove();
}
    
UI.prototype.completeTask = function(e){
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdat;
  ls.completeTask(id);
  task.classList.toggle('completed');
}
UI.prototype.editTask = function (e){
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdat;
  const data = ls.findTask(id);

  document.querySelector('#newtaskID').value = data.title;
  document.querySelector('#updateTaskId').value = data.id;

  document.querySelector('.AddTaskBtn').style.display = 'none';
  document.querySelector('.EditTaskBtn').style.display = 'inline';
  document.querySelector('.CancelTaskBtn').style.display = 'inline';
}

UI.prototype.updateTask = function(e){
  const taskId =   document.querySelector('#updateTaskId').value;
  const taskTitle =   document.querySelector('#newtaskID').value;
  const task = document.querySelectorAll('.task-title'); 

  if(taskTitle.length > 0){
    ls.updateTask(taskId,taskTitle);
    task.forEach((title) => {
      if(title.parentElement.parentElement.dataset.createdat === taskId){
        title.innerText = taskTitle;
      }
    });
  }

  document.querySelector('#newtaskID').value = '';
  document.querySelector('#updateTaskId').value = '';

  document.querySelector('.AddTaskBtn').style.display = 'inline';
  document.querySelector('.EditTaskBtn').style.display = 'none';
  document.querySelector('.CancelTaskBtn').style.display = 'none';
};

UI.prototype.cancelTask = function(e){
  document.querySelector('#newtaskID').value = '';
  document.querySelector('#updateTaskId').value = '';

  document.querySelector('.AddTaskBtn').style.display = 'inline';
  document.querySelector('.EditTaskBtn').style.display = 'none';
  document.querySelector('.CancelTaskBtn').style.display = 'none';
}
export default UI;
/* <div class="task-list">
          <div class="task" data-createdat="12/12/2022, 6:59:55 PM">
            <div class="task__details">
              <input type="checkbox" class="task-check" />
              <label class="task-title">Hello world</label>
            </div>

            <div class="task__op">
              <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
              <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
            </div>
          </div>
        </div> */