import { renderHome } from "./home";
import {getAllProjects,getDefault, getAllTodos, getDueSoonTodos, getHighPriorityTodos, addProject, removeProject, addTodo, editTodo, removeTodo, clearData} from "./logicController";
import { generateCard, generateTodoPage } from "./todos";
import { createProjectDisplay, renderProjects } from "./projects";
import { showModal } from "./modal";
import backIcon from "./assets/backIcon.svg";
import { clearStorage } from "./persistanceController";

// Set initial page to home

let getCurrentContent = getHomeContent;

function init() {
    const homeBut = document.getElementById("home");
    const newTodoBut = document.getElementById("newTodo");
    const newProjectBut = document.getElementById("newProject");
    const projectNav = document.getElementById("projectNav");
    const clearDataBut = document.getElementById("clearStorage");

    const newProjform = document.getElementById("projectForm");
    const newProjInput = newProjform.querySelector("input");
    const addProjBut = newProjform.querySelector("button");
    const cancelProjBut = newProjform.querySelector("button:last-child");

    const modal = document.getElementById("newTodoModal");


    newTodoBut.addEventListener("click", () => {
        showModal(modal, getAllProjects().getProjects(),makeSubmitHandler())
    })

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
        toggleHidden(newProjform,newProjectBut)
        loadCurrentPage();
    });

    cancelProjBut.addEventListener("click", () => {
        toggleHidden(newProjform,newProjectBut)
    });

    clearDataBut.addEventListener("click", () => {
        clearData()
        window.location.reload();
    })

    updateAside(getAllProjects());

    // Load home content on page load
    loadCurrentPage();

}

// Update the project list in the aside
function updateAside() {
    const projectList = getAllProjects()
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

function makeSubmitHandler(todo){
    return function(name, dueDate, priority, project, desc){
        if(name === ""){
        return false;
        }

        if(todo){
            editTodo(todo, name, priority, dueDate, desc, project)
        }else{
            addTodo(name, priority, dueDate, desc, project);
        }

        loadCurrentPage();
        return true;
    }
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
        const delFunc = makeProjDelFun(project, getCurrentContent)
        const todoList = generateCardList(project.getTodos(),"small")
        displays.push(createProjectDisplay(project, todoList,false,navFunc,delFunc));
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
        const delBut = makeProjDelFun(project, prevPage)
        const projectDisplay = createProjectDisplay(project, todoCards, true,0,delBut);

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
        const editFunc = makeTodoEditFunc(todo)
        outList.push(generateCard(todo, size, navFunc, delFunc, editFunc));
    });
    return outList;
}

function createTodoPageFunc(todo, prevPage){
    return function() {
        const parent = document.createElement("div");
        const backBut = makeBackButton(prevPage);

        const delFunc = makeTodoDelFunc(todo,prevPage);
        const editFunc = makeTodoEditFunc(todo)

        const projectNav = makeNavFunc(createProjectContentFunc(todo.getProject(),getCurrentContent));
        const todoCard = generateTodoPage(todo,backBut,projectNav,delFunc,editFunc);

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
        removeTodo(todo)
        if(prevPage){getCurrentContent = prevPage}
        loadCurrentPage()
    }
}

function makeTodoEditFunc(todo){
    return function(){
        const modal = document.getElementById("newTodoModal");
        showModal(modal, getAllProjects().getProjects(),makeSubmitHandler(todo),true,todo)
    }
}

function makeProjDelFun(project, prevPage){
    return function(){
        removeProject(project)
        if(prevPage){getCurrentContent = prevPage}
        updateAside()
        loadCurrentPage()
    }
}

// Toggle visibility of two elements at once
function toggleHidden(a, b){
    a.classList.toggle("hidden");
    b.classList.toggle("hidden");
}

export {updateAside, init}