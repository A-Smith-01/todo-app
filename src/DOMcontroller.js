const updateAside = function(projectList) {
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

module.hot.accept();

export {updateAside}