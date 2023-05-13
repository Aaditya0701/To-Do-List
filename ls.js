import UI from './ui.js';

function LS(){}

LS.prototype.fetchtask = function(){
    let tasks = localStorage.getItem('tasks');

    //convert the json data to array data
    if(tasks){
        tasks = JSON.parse(tasks);
    }else{
        tasks = [];
    }
    return tasks;
}
LS.prototype.storetask = function (task){
    //accessing upper prototype
    let tasks = this.fetchtask();
    //storing data at forst position using unshift method
    tasks.unshift(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}


LS.prototype.deletetask = function (id){
    let tasks = this.fetchtask();
    let index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
};

LS.prototype.completeTask = function (id){
    let tasks = this.fetchtask();
    let index = tasks.findIndex((task) => task.id === id);
    if (tasks[index].isComplete){
        tasks[index].isComplete = false;
    }else{
        tasks[index].isComplete = true;
    }
    localStorage.setItem('tasks' , JSON.stringify(tasks));
};
LS.prototype.findTask = function(id){
    let tasks = this.fetchtask();
    return tasks.find((task) => task.id === id);
}

LS.prototype.updateTask = function(id,title){
    let tasks = this.fetchtask();
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].title = title;
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

export default LS;