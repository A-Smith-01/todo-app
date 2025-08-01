import { projectListFactory, projectFactory, todoFactory} from "./factories";
import { clearStorage, loadStorage, updateStorage } from "./persistanceController";


// load saved todos and projects from local storage
console.log("Initializing project list");
const saved = loadStorage()
const projectList = saved ? projectListFactory.fromJSON(saved) : projectListFactory();

// PLACEHOLER REMOVE LATER
if(!saved){
    // Create default project for todos to go in
    const defaultProject = projectFactory("Unassigned");
    defaultProject.setDefault();
    projectList.addProject(defaultProject);

    defaultProject.addTodo(todoFactory("Example Todo 1", "High","2025-08-01","example description", defaultProject));
    defaultProject.addTodo(todoFactory("Example Todo 2", "Medium","2025-08-04","example description", defaultProject));
    defaultProject.addTodo(todoFactory("Example Todo 3", "Low","2025-08-02","example description", defaultProject));
    defaultProject.addTodo(todoFactory("Example Todo 4", "Medium","2025-07-27","example description", defaultProject));
    defaultProject.addTodo(todoFactory("Example Todo 5", "High","","example description", defaultProject));
}
// This function will return todos with a due date sorted ascending
const getDueSoonTodos = function() {
    const soonFilter = todo => {
        return todo.getDueDate() !== "N/A" && todo.getDueDate() <= 7;
    }

    const sortByDueDate = (a, b) => { return a.getDueDate() - b.getDueDate(); };

    return getAllTodos().filter(soonFilter).sort(sortByDueDate);
}

// This function will return all todos that are high priority
const getHighPriorityTodos = function() {
    return getAllTodos().filter(todo => todo.getPriority() === "High");
}

// Returns all todos from all projects
const getAllTodos = function() {
    let allTodos = [];
    projectList.getProjects().forEach( project => {
        project.getTodos().forEach(todo => {
            allTodos.push(todo);
        })
    })

    console.log(allTodos);

    const sortByName = (a, b) => a.getName().localeCompare(b.getName());

    return allTodos.sort(sortByName);
}

const getDefault = function(){
    return defaultProject;
}

// Returns the project list OBJECT
const getAllProjects = function() {
    return projectList;
}

const addProject = function(name) {
    projectList.addProject(projectFactory(name))
    updateStorage(projectList.toJSON())
}

const addTodo = function(name, priority, dueDate, description, projectId){
    const project = getAllProjects().getProjectById(projectId);
    const todo = todoFactory(name, priority, dueDate, description, project);
    project.addTodo(todo);
    updateStorage(projectList.toJSON())
}

const editTodo = function(todo, name, priority, dueDate, description, projectId){
    removeTodo(todo)
    const project = getAllProjects().getProjectById(projectId);
    todo.setName(name);
    todo.setPriority(priority);
    todo.setDueDate(dueDate)
    todo.setDescription(description)
    todo.setProject(project)
    project.addTodo(todo);
    updateStorage(projectList.toJSON())
}

const removeTodo = function(todo){
    todo.getProject().removeTodo(todo);
    updateStorage(projectList.toJSON())
}

const removeProject = function(project){
    projectList.removeProject(project)
    updateStorage(projectList.toJSON())
}

const clearData = function(){
    clearStorage()
}

export {getDueSoonTodos, getHighPriorityTodos,getDefault, getAllTodos, getAllProjects, addProject, removeProject, addTodo, editTodo, removeTodo, clearData};