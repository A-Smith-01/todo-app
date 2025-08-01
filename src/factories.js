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

    function toJSON() {
        return {
            projects: projects.map(p => p.toJSON())
        };
    }

    return {getProjects, addProject, removeProject, getProjectById, toJSON}
}

projectListFactory.fromJSON = function(obj) {
    const list = projectListFactory();
    // First, create all projects without todos
    const projectsById = {};
    obj.projects.forEach(projObj => {
        const project = projectFactory(projObj.name, projObj.id, projObj.defaultProject);
        list.addProject(project);
        projectsById[projObj.id] = project;
    });
    // Now, add todos to each project
    obj.projects.forEach(projObj => {
        const project = projectsById[projObj.id];
        projObj.todos.forEach(todoObj => {
            const todo = todoFactory.fromJSON(todoObj, project);
            project.addTodo(todo);
        });
    });
    return list;
};

function projectFactory (name, id, defaultProject = false){
    const todoList = [];
    const _id = id || crypto.randomUUID();
    let _defaultProject = defaultProject

    const getId = function() {
        return _id;
    }

    const setDefault = function() {
        _defaultProject = true;
    }

    const isDefault = function() {
        return _defaultProject;
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

    function toJSON() {
        return {
            name: getName(),
            id: _id,
            defaultProject: _defaultProject,
            todos: todoList.map(todo => todo.toJSON())
        };
    }

    return {getId, getName, setName, getTodos, addTodo, removeTodo, setDefault, isDefault, toJSON};
}

projectFactory.fromJSON = function(obj) {
    const project = projectFactory(obj.name, obj.id, obj.defaultProject);
    if (obj.todos) {
        obj.todos.forEach(todoObj => {
            const todo = todoFactory.fromJSON(todoObj, project);
            project.addTodo(todo);
        });
    }
    return project;
};

function todoFactory(name, priority, dueDate, description, project, id) {
    const _id = id || crypto.randomUUID();
    if (typeof dueDate === 'undefined') { dueDate = 0; }
    if (typeof description === 'undefined') { description = 'No description.'; }

    const getId = function() {
        return _id;
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

    const getDate = function(){
        return dueDate;
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

    function toJSON() {
        return {
            name: getName(),
            priority: getPriority(),
            dueDate: getDate(),
            description: getDescription(),
            id: _id,
            projectId: project.getId()
        };
    }

    return {getId ,getName, setName, getPriority, setPriority,getDate, getDueDate, setDueDate, getDescription, setDescription, getProject, setProject, toJSON};
}

todoFactory.fromJSON = function(obj, project) {
    return todoFactory(obj.name, obj.priority, obj.dueDate, obj.description, project, obj.id);
};

export { projectListFactory, projectFactory, todoFactory}