function projectListFactory() {
    const projects = [];

    const getProjects = function() {
        return projects;
    }

    const addProject = function(project){
        projects.push(project);
    }

    const removeProject = function(project) {
        const index = projects.indexOf(project);
        if (index > -1) {
            projects.splice(index, 1);
        }
    }

    return {getProjects, addProject, removeProject}
}

function projectFactory (name){
    const todoList = [];
    let defaultProject = false;

    const setDefault = function() {
        defaultProject = true;
    }

    const isDefault = function() {
        return defaultProject;
    }

    const getName = function() {
        return name;
    }

    const setName = function(newName) {
        name = newName;
    }

    const getTodos = function() {
        return todoList;
    }

    const addTodo = function(todo){
        todoList.push(todo);
    }

    const removeTodo = function(todo) {
        const index = todoList.indexOf(todo);
        if (index > -1) {
            todoList.splice(index, 1);
        }
    }

    return {getName, setName, getTodos, addTodo, removeTodo, setDefault, isDefault};
}

function todoFactory(name, priority, dueDate, description) {
    if (typeof dueDate === 'undefined') { dueDate = 'N/A'; }
    if (typeof description === 'undefined') { description = 'No description.'; }

    const getName = function() {
        return name;
    }

    const setName = function(newName) {
        name = newName;
    }

    const getPriority = function() {
        return priority;
    }

    const setPriority = function(newPriority) {
        if (newPriority !== 'high' && newPriority !== 'med' && newPriority !== 'low') {
            return;
        }
        priority = newPriority;
    }

    const getDueDate = function() {
        return dueDate;
    }

    const setDueDate = function(newDueDate) {
        dueDate = newDueDate;
    }

    const getDescription = function() {
        return description;
    }

    const setDescription = function(newDescription) {
        description = newDescription;
    }

    return {getName, setName, getPriority, setPriority, getDueDate, setDueDate, getDescription, setDescription};
}

export { projectListFactory, projectFactory, todoFactory}