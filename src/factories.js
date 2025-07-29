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

    const getProjectById = function(id) {
        return projects.find(project => project.getId() === id);
    }

    return {getProjects, addProject, removeProject, getProjectById}
}

function projectFactory (name){
    const todoList = [];
    const id = crypto.randomUUID();
    let defaultProject = false;

    const getId = function() {
        return id;
    }

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

    return {getId, getName, setName, getTodos, addTodo, removeTodo, setDefault, isDefault};
}

function todoFactory(name, priority, dueDate, description, project) {
    const id = crypto.randomUUID();
    if (typeof dueDate === 'undefined') { dueDate = 0; }
    if (typeof description === 'undefined') { description = 'No description.'; }

    const getId = function() {
        return id;
    }

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
        if (!dueDate) {
            return 'N/A';
        }
        const date = new Date(dueDate);
        const today = Date.now();

        const diffTime = date - today;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
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

    const getProject = function() {
        return project;
    }

    const setProject = function(newProject) {
        project = newProject;
    }

    return {getId ,getName, setName, getPriority, setPriority, getDueDate, setDueDate, getDescription, setDescription, getProject, setProject};
}

export { projectListFactory, projectFactory, todoFactory}