import { renderHome } from "./home";
import {getAllProjects, getAllTodos, getDueSoonTodos, getHighPriorityTodos, addProject, addTodo} from "./logicController";
import { generateCard, generateTodoPage } from "./todos";
import { createProjectDisplay, renderProjects } from "./projects";
import backIcon from "./assets/backIcon.svg";

// Set initial page to home

let getCurrentContent = getHomeContent;

function init() {
    const homeBut = document.getElementById("home");
    const newTodoBut = document.getElementById("newTodo");
    const newProjectBut = document.getElementById("newProject");
    const projectNav = document.getElementById("projectNav");
    

    const newProjform = document.getElementById("projectForm");
    const newProjInput = newProjform.querySelector("input");
    const addProjBut = newProjform.querySelector("button");
    const cancelProjBut = newProjform.querySelector("button:last-child");

    const todoModal = document.getElementById("newTodoModal");
    const todoNameIn = document.getElementById("nameIn");
    const todoPriorityIn = document.getElementById("priorityIn");
    const todoDueIn = document.getElementById("dueIn");
    const todoDescIn = document.getElementById("descIn");
    const todoProjectIn = document.getElementById("projectIn");
    const todoSubmitBut = document.getElementById("todoSubmit");
    const todoCancelBut = document.getElementById("todoCancel");

    

    newTodoBut.addEventListener("click", () => {
        todoModal.classList.toggle("hidden")
    })

    todoCancelBut.addEventListener("click", () => {
        todoModal.classList.toggle("hidden")
    });

    todoSubmitBut.addEventListener("click", () => {
        const name = todoNameIn.value.trim();
        const priority = todoPriorityIn.value;
        const dueDate = todoDueIn.value;
        const description = todoDescIn.value.trim();
        const projectId = todoProjectIn.value;

        console.log(dueDate);
        if(name === ""){
            return;
        }

        addTodo(name, priority, dueDate, description, projectId);

        loadCurrentPage();

        todoModal.classList.toggle("hidden");
    });

    homeBut.addEventListener("click", () => {
        getCurrentContent = getHomeContent;
        loadCurrentPage();
    });

    projectNav.addEventListener("click", () => {
        getCurrentContent = getProjectsContent;
        loadCurrentPage();
    });

    newProjectBut.addEventListener("click", () => {
        toggleHidden(newProjform,newProjectBut)
    });

    addProjBut.addEventListener("click", () => {
        const projectName = newProjInput.value.trim();
        if(projectName === "") {return ;}
        addProject(projectName);
        updateAside(getAllProjects());
        updateProjectOptions(todoProjectIn)
        toggleHidden(newProjform,newProjectBut)
        loadCurrentPage();
    });

    cancelProjBut.addEventListener("click", () => {
        toggleHidden(newProjform,newProjectBut)
    });

    updateAside(getAllProjects());

    updateProjectOptions(todoProjectIn);

    // Load home content on page load
    loadCurrentPage();

}

// Update the project list in the aside
function updateAside(projectList) {
    const listDiv = document.getElementById("projects")
    listDiv.replaceChildren();

    projectList.getProjects().forEach(element => {
        if (element.isDefault()) {
            return;
        }
        const projectBut = document.createElement("button");
        projectBut.classList.add("project");
        projectBut.textContent = element.getName();
        projectBut.addEventListener("click", () => {
            getCurrentContent = createProjectContentFunc(element, getCurrentContent);
            loadCurrentPage();
        });
        listDiv.appendChild(projectBut);
    });
}

// Update the list of options for the project selector in the todo modal
function updateProjectOptions(selector){
    selector.replaceChildren();
    const projectList = getAllProjects();
    projectList.getProjects().forEach(project => {
        const option = document.createElement("option");
        option.value = project.getId();
        option.textContent = project.getName();
        if(project.isDefault()){
            option.selected = "selected";
        }
        selector.appendChild(option);
    });
}

// Call current content function and put it in the content div
function loadCurrentPage(){
    const content = document.getElementById("content");
    content.replaceChildren(getCurrentContent());
}

// Create content for home page
function getHomeContent(){
    const allTodos = generateCardList(getAllTodos(),"small");
    const dueSoon = generateCardList(getDueSoonTodos(),"small");
    const highPriority = generateCardList(getHighPriorityTodos(),"small");
    return renderHome(allTodos, dueSoon, highPriority)
}

// Create content for projects page
function getProjectsContent(){
    const displays = [];
    const projects = getAllProjects().getProjects();
    projects.forEach(project => {
        const navFunc = makeNavFunc(createProjectContentFunc(project, getCurrentContent));
        const todoList = generateCardList(project.getTodos(),"small")
        displays.push(createProjectDisplay(project, todoList,false,navFunc));
    });

    return renderProjects(displays);
}

// Returns function that will create a page for a specific project
function createProjectContentFunc(project, prevPage) {
    return function() {
        if(!project){
            return prevPage;
        }
        const todoCards = generateCardList(project.getTodos(), "med");

        const parent = document.createElement("div");
        const backBut = makeBackButton(prevPage);
        const projectDisplay = createProjectDisplay(project, todoCards, true);

        parent.appendChild(backBut);
        parent.appendChild(projectDisplay);

        return parent;
    }
}

// Create list of todo card elements
function generateCardList(todoList, size){
    const outList = [];
    todoList.forEach(todo => {
        const navFunc = makeNavFunc(createTodoPageFunc(todo, getCurrentContent));
        const delFunc = makeTodoDelFunc(todo);
        outList.push(generateCard(todo, size, navFunc, delFunc));
    });
    return outList;
}

function createTodoPageFunc(todo, prevPage){
    return function() {
        const parent = document.createElement("div");
        const backBut = makeBackButton(prevPage);

        const delFunc = makeTodoDelFunc(todo,prevPage);

        const projectNav = makeNavFunc(createProjectContentFunc(todo.getProject(),getCurrentContent));
        const todoCard = generateTodoPage(todo,backBut,projectNav,delFunc);

        parent.appendChild(backBut);
        parent.appendChild(todoCard);

        return parent;
    }
}

function makeBackButton(prevPage) {
    const backBut = document.createElement("button");
    const text = document.createElement("span");
    const icon = document.createElement("img");
    icon.src = backIcon;
    text.textContent = "Back";
    backBut.classList.add("back-button");
    backBut.appendChild(icon);
    backBut.appendChild(text);
    backBut.addEventListener("click", () => {
        makeNavFunc(prevPage)();
    });
    return backBut;
}

function makeNavFunc(navPage){
    return function(){
        getCurrentContent = navPage;
        loadCurrentPage();
    }
}

function makeTodoDelFunc(todo, prevPage){
    return function(){
        todo.getProject().removeTodo(todo);
        if(prevPage){getCurrentContent = prevPage}
        loadCurrentPage()
    }
}

// Toggle visibility of two elements at once
function toggleHidden(a, b){
    a.classList.toggle("hidden");
    b.classList.toggle("hidden");
}



export {updateAside, init}