function createProjectDisplay(project, todoCards){
    const projectDiv = document.createElement("div");

    // Header content
    const header = document.createElement("h1");
    header.textContent = project.getName();
    const todoCount = document.createElement("span");
    todoCount.textContent = `${project.getTodos().length} Todos`;


    // Insert todo
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("card-container");  
    todoContainer.classList.add("single-row");
    todoCards.forEach(card => {
        todoContainer.appendChild(card);
    });

    // Put the parts together
    projectDiv.appendChild(header);
    projectDiv.appendChild(todoCount);
    projectDiv.appendChild(todoContainer)

    return projectDiv;
}

function renderProjects(projectDisplays){
    const parent = document.createElement("div");
    projectDisplays.forEach(display => {
        parent.appendChild(display);
    });

    return parent;
}

export { createProjectDisplay, renderProjects}