import { renderHome } from "./home";
import {getAllProjects, getAllTodos, getDueSoonTodos, getHighPriorityTodos, addProject} from "./logicController";

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
        console.log("ding");
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

    homeBut.addEventListener("click", () => {
        content.replaceChildren(renderHome(getAllTodos(), getDueSoonTodos(), getHighPriorityTodos()))
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
    });

    cancelProjBut.addEventListener("click", () => {
        toggleHidden(newProjform,newProjectBut)
    });

    updateAside(getAllProjects());

}

function toggleHidden(a, b){
    a.classList.toggle("hidden");
    b.classList.toggle("hidden");
}



export {updateAside, init}