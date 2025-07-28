import { projectListFactory, projectFactory, todoFactory} from "./factories";
import { updateAside } from "./DOMcontroller";

const init = function() {
    // load saved todos and projects from local storage
    console.log("Initializing project list");
    const projectList = projectListFactory();

    // Create default project for todos to go in
    projectList.addProject(projectFactory("Unassigned"));

    // Add event listeners for aside buttons


    // Load projects to sidebar
    console.log("Updating aside");
    updateAside(projectList);

    // Load home page
}

export {init};