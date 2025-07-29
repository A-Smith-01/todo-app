import { renderHome } from "./home";
import {getAllProjects, getAllTodos, getDueSoonTodos, getHighPriorityTodos, addProject, addTodo} from "./logicController";

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
        listDiv.appendChild(projectBut);
    });
}

function init() {
    const homeBut = document.getElementById("home");
    const newTodoBut = document.getElementById("newTodo");
    const newProjectBut = document.getElementById("newProject");
    const projectNav = document.getElementById("projectNav");
    const content = document.getElementById("content");

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

    let currentContent = renderHome(getAllTodos(), getDueSoonTodos(), getHighPriorityTodos());

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

        // SOMEHOW HANDLE UPDATING THE UI????

        todoModal.classList.toggle("hidden");
    });

    homeBut.addEventListener("click", () => {
        currentContent = renderHome(getAllTodos(), getDueSoonTodos(), getHighPriorityTodos())
        content.replaceChildren(currentContent);
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
    });

    cancelProjBut.addEventListener("click", () => {
        toggleHidden(newProjform,newProjectBut)
    });

    updateAside(getAllProjects());

    updateProjectOptions(todoProjectIn);

    // Load home content on page load
    content.replaceChildren(currentContent)

}

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

function toggleHidden(a, b){
    a.classList.toggle("hidden");
    b.classList.toggle("hidden");
}



export {updateAside, init}