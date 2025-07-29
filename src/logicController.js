import { projectListFactory, projectFactory, todoFactory} from "./factories";


// load saved todos and projects from local storage
console.log("Initializing project list");
const projectList = projectListFactory();

// Create default project for todos to go in
const defaultProject = projectFactory("Unassigned");
defaultProject.setDefault();
projectList.addProject(defaultProject);

// PLACEHOLER REMOVE LATER
defaultProject.addTodo(todoFactory("Example Todo 1", "High","2025-08-01"));
defaultProject.addTodo(todoFactory("Example Todo 2", "Medium","2025-08-04"));
defaultProject.addTodo(todoFactory("Example Todo 3", "Low","2025-08-02"));
defaultProject.addTodo(todoFactory("Example Todo 4", "Medium","2025-07-27"));
defaultProject.addTodo(todoFactory("Example Todo 5", "High"));

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

// Returns the project list OBJECT
const getAllProjects = function() {
    return projectList;
}

const addProject = function(name) {
    projectList.addProject(projectFactory(name))
}

const addTodo = function(name, priority, dueDate, description, projectId){
    const project = getAllProjects().getProjectById(projectId);
    const todo = todoFactory(name, priority, dueDate, description, projectId);
    project.addTodo(todo);
}

export {getDueSoonTodos, getHighPriorityTodos, getAllTodos, getAllProjects, addProject, addTodo};