import { projectListFactory, projectFactory, todoFactory} from "./factories";


// load saved todos and projects from local storage
console.log("Initializing project list");
const projectList = projectListFactory();

// Create default project for todos to go in
const defaultProject = projectFactory("Unassigned");
projectList.addProject(defaultProject);

// PLACEHOLER REMOVE LATER
defaultProject.addTodo(todoFactory("Example Todo 1", "High"));
defaultProject.addTodo(todoFactory("Example Todo 2", "Medium"));
defaultProject.addTodo(todoFactory("Example Todo 3", "Low"));
defaultProject.addTodo(todoFactory("Example Todo 4", "Medium"));
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

export {getDueSoonTodos, getHighPriorityTodos, getAllTodos, getAllProjects};