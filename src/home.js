import { generateSmallCard } from "./todos";

function renderHome (allTodos, dueSoon, highPriority){
    const parent = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = "Due Soon";
    const dueSoonDiv = document.createElement("div");
    dueSoonDiv.classList.add("card-container");
    dueSoonDiv.classList.add("single-row");
    addCards(dueSoonDiv, dueSoon);
    console.log("GENERATED DUE SOON CARDS");

    const h2 = document.createElement("h1");
    h2.textContent = "High Priority";
    const highPrioritynDiv = document.createElement("div");
    highPrioritynDiv.classList.add("card-container");
    highPrioritynDiv.classList.add("single-row");
    addCards(highPrioritynDiv, highPriority)
    console.log("GENERATED HIGH PRIORITY CARDS");

    const h3 = document.createElement("h1");
    h3.textContent = "All Todos";
    const allTodosDiv = document.createElement("div");
    allTodosDiv.classList.add("card-container");
    addCards(allTodosDiv, allTodos);
    console.log("GENERATED ALL TODO CARDS");

    parent.appendChild(h1);
    parent.appendChild(dueSoonDiv);
    parent.appendChild(h2);
    parent.appendChild(highPrioritynDiv);
    parent.appendChild(h3);
    parent.appendChild(allTodosDiv);

    return parent;
}

function addCards(parentDiv, todoList) {
    todoList.forEach(todo => {
        parentDiv.appendChild(todo);
    });
}

export { renderHome };