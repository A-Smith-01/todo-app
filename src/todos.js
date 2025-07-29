import editIcon from "./assets/editIcon.svg";
import checkIcon from "./assets/checkIcon.svg";

function generateSmallCard(todo){
    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.classList.add(todo.getPriority().toLowerCase());

    // HEADER
    const header = document.createElement("h3");
    header.textContent = todo.getName();

    const lowerContent = document.createElement("div");
    lowerContent.classList.add("lower-content");

    // PRIORITY AND DUE DATE
    const lowerLeft = document.createElement("div");
    lowerLeft.classList.add("lower-left");

    const priority = document.createElement("span");
    priority.textContent = `${todo.getPriority()} Priority`;

    const dueDate = document.createElement("span");
    if(todo.getDueDate() === "N/A") {
        dueDate.textContent = "No Due Date";
    }else if(todo.getDueDate() == 0) {
        dueDate.textContent = "Due Today";
    }else if(todo.getDueDate() < 0) {
        dueDate.textContent = `Due ${Math.abs(todo.getDueDate())} Days ago`;
    }else{
        dueDate.textContent = `Due in ${todo.getDueDate()} Days`;
    }

    lowerLeft.appendChild(priority);
    lowerLeft.appendChild(dueDate)

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
    card.appendChild(lowerContent);

    // ADD EVENT LISTENERS TO BUTTONS

    return card;
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

export {generateSmallCard}