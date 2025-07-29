import { renderHome } from "./home";
import {getAllProjects, getAllTodos, getDueSoonTodos, getHighPriorityTodos} from "./logicController";

function updateAside(projectList) {
    const listDiv = document.getElementById("projects")
    listDiv.replaceChildren();

    projectList.getProjects().forEach(element => {
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

    homeBut.addEventListener("click", () => {
        content.replaceChildren(renderHome(getAllTodos(), getDueSoonTodos(), getHighPriorityTodos()))
    });

    updateAside(getAllProjects());

}



export {updateAside, init}