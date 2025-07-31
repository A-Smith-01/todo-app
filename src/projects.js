import binIcon from "./assets/binIcon.svg"

function createProjectDisplay(project, todoCards, singlePage, navFunc, delFunc){
    const projectDiv = document.createElement("div");

    // Header content
    const headContent = document.createElement("div");
    headContent.classList.add("project-header");
    if(singlePage){
        headContent.classList.add("single-page");
    }

    const title = document.createElement("div")
    const header = document.createElement("h1");
    header.textContent = project.getName();
    if(!singlePage){
        header.classList.add("clickable")
        header.addEventListener("click", () => {navFunc()})
    }
    title.appendChild(header);

    if(!project.isDefault()){
        const delBut = document.createElement("button");
        const delIcon = document.createElement("img");
        const toolip = document.createElement("span");
        delBut.classList.add("clickable")
        delIcon.src = binIcon;
        toolip.classList.add("tooltiptext");
        toolip.textContent = "Delete project";
        delBut.appendChild(delIcon)
        delBut.appendChild(toolip)

        delBut.addEventListener("click",() => {delFunc()})

        title.appendChild(delBut)
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

    headContent.appendChild(title);
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