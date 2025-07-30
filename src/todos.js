import editIcon from "./assets/editIcon.svg";
import checkIcon from "./assets/checkIcon.svg";

function generateCard(todo, size,navFunc){
    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.classList.add(todo.getPriority().toLowerCase());
    card.classList.add(size);

    // HEADER
    const header = document.createElement("h3");
    header.textContent = todo.getName();
    header.classList.add("clickable");
    header.addEventListener("click", () => {navFunc()})

    const lowerContent = document.createElement("div");
    lowerContent.classList.add("lower-content");

    // PRIORITY AND DUE DATE
    const lowerLeft = document.createElement("div");
    lowerLeft.classList.add("lower-left");

    const priority = document.createElement("span");
    priority.textContent = `${todo.getPriority()} Priority`;

    const dueDate = document.createElement("span");
    dueDate.textContent = formatDueDate(todo)

    lowerLeft.appendChild(priority);
    lowerLeft.appendChild(dueDate)

    // DESCRIPTION
    const description = document.createElement("p");
    description.textContent = todo.getDescription();

    // EDIT AND COMPLETED BUTTONS
    const lowerRight = document.createElement("div");
    lowerRight.classList.add("lower-right");

    const editBut = generateIconButton("edit",editIcon,"Edit");
    const completeBut = generateIconButton("check",checkIcon,"Completed");

    lowerRight.appendChild(editBut);
    lowerRight.appendChild(completeBut)

    // PUTTING IT ALL TOGETHER
    lowerContent.appendChild(lowerLeft);
    lowerContent.appendChild(lowerRight);
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(lowerContent);

    // ADD EVENT LISTENERS TO BUTTONS

    return card;
}

function generateTodoPage(todo, backBut, projectNav){
    const parent = document.createElement("div");
    parent.classList.add("todo-page")

    const header = document.createElement("h1");
    header.textContent = todo.getName();

    const midContent = document.createElement("div");
    midContent.classList.add("mid-content");

    const project = document.createElement("div");
    const todoProject = todo.getProject();
    if(todoProject.isDefault()){
        project.textContent = `Not assigned to any project`;
    }else{
        project.textContent = `In project: ${todoProject.getName()}`;
        project.classList.add("clickable")
        project.addEventListener("click", () => {projectNav()})
    }
    

    const priority = document.createElement("div");
    priority.classList.add(todo.getPriority().toLowerCase())
    priority.textContent = `${todo.getPriority()} Priority`;

    const dueDate = document.createElement("div");
    dueDate.textContent = formatDueDate(todo)

    const description = document.createElement("p");
    description.textContent = todo.getDescription();

    parent.appendChild(backBut)
    parent.appendChild(header)
    midContent.appendChild(project)
    midContent.appendChild(priority)
    midContent.appendChild(dueDate)
    parent.appendChild(midContent)
    parent.appendChild(description)

    return parent;
}

function generateIconButton(className, iconSource, tooltipText){
    const but = document.createElement("button");
    const icon = document.createElement("img");
    const toolip = document.createElement("span");

    but.classList.add(className);
    icon.src = iconSource;
    icon.alt = tooltipText;
    toolip.classList.add("tooltiptext");
    toolip.textContent = tooltipText;

    but.appendChild(icon);
    but.appendChild(toolip);

    return but;
}

function formatDueDate(todo){
    if(todo.getDueDate() === "N/A") {
        return "No Due Date";
    }else if(todo.getDueDate() == 0) {
        return "Due Today";
    }else if(todo.getDueDate() < 0) {
        return `Due ${Math.abs(todo.getDueDate())} Days ago`;
    }else{
        return `Due in ${todo.getDueDate()} Days`;
    }
}

export {generateCard, generateTodoPage}