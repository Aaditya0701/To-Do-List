import UI from './ui.js';
import LS from './ls.js';
import Task from './task.js';

const ui = new UI();

ui.showAllTask();

document.querySelector('.AddTaskBtn').addEventListener('click' , e =>{
    const taskTitle = document.querySelector('#newtaskID').value;
    // console.log(taskTitle);

    if(taskTitle.length > 0){
        const task = new Task(taskTitle);
        ui.addToUI(task);
        ui.resetform();
        // console.log(task);
    }
});

document.querySelector('.task-list').addEventListener('click',(e) =>{
    // console.log(e.target.className);
    if(e.target.className.includes('task__op_edit')){
        ui.editTask(e);
    }
    if(e.target.className.includes('task__op_delete')){
        ui.deletetask(e);
    }
    if(e.target.className.includes('task-check')){
        ui.completeTask(e);
    }
})

document.querySelector('.EditTaskBtn').addEventListener('click' , (e) => {
    ui.updateTask(e);
})

document.querySelector('.CancelTaskBtn').addEventListener('click' , (e) => {
    ui.cancelTask(e);
})