function createProjectDisplay(project, todoCards, singlePage, navFunc){
    const projectDiv = document.createElement("div");

    // Header content
    const headContent = document.createElement("div");
    headContent.classList.add("project-header");
    if(singlePage){
        headContent.classList.add("single-page");
    }
    const header = document.createElement("h1");
    header.textContent = project.getName();
    if(!singlePage){
        header.classList.add("clickable")
        headContent.addEventListener("click", () => {navFunc()})
    }

    const todoCount = document.createElement("span");
    const noTodos = project.getTodos().length
    if(noTodos === 0){
        todoCount.textContent = "No Todos have been added to this project";
    }else if(noTodos === 1){
        todoCount.textContent = "1 Todo";
    }
    else{
        todoCount.textContent = `${noTodos} Todos`;
    }

    headContent.appendChild(header);
    headContent.appendChild(todoCount);

    // Insert todo
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("card-container");  
    if(!singlePage){todoContainer.classList.add("single-row");}
    else{
        todoContainer.classList.add("multi-row");
    }
    todoCards.forEach(card => {
        todoContainer.appendChild(card);
    });

    // Put the parts together
    projectDiv.appendChild(headContent);
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