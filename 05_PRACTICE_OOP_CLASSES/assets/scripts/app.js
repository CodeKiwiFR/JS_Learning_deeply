/*
    PROJECT JS - Practice OOP and Classes
    codeKiwi
    18/11/2020
*/

class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        // When we append an element from the DOM somewhere else in the DOM
        // It is moved, not copyied or anything else
        destinationElement.append(element);
    }

    static clearEventListeners(element) {
        // We clone the element -> true for deep clone
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    hide() {
        if (this.element) {
            this.element.remove();
            // Older borwsers: this.element.parentElement.removeChild(this.element);
        }
    }

    show() {
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? "afterbegin" : "beforeend",
            this.element
        );
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction) {
        super(null, false);
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip() {
        this.hide();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement("div");
        this.element = tooltipElement;
        tooltipElement.className = "card";
        tooltipElement.textContent = "Dummy Text";
        tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    }
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListFunction) {
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        // Calling methods in order to keep the constructor clean
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoButton = projectItemElement.querySelector(
            "button:first-of-type"
        );
        moreInfoButton.addEventListener("click", this.showMoreInfoHandler);
    }

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        const switchButton = projectItemElement.querySelector(
            "button:last-of-type"
        );
        switchButton.addEventListener(
            "click",
            this.itemSwitchContext.bind(this, switchButton)
        );
    }

    setNewListHandler(updateProjectListFunction) {
        this.updateProjectListHandler = updateProjectListFunction;
    }

    itemSwitchContext(switchButton) {
        this.updateProjectListHandler(this.id);
        switchButton.textContent =
            switchButton.textContent === "Activate" ? "Finish" : "Activate";
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        });
        tooltip.show();
        this.hasActiveTooltip = true;
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        for (const item of projectItems) {
            this.projects.push(
                new ProjectItem(item.id, this.switchProject.bind(this))
            );
        }
    }

    setSwitchHandler(switchHandler) {
        this.switchHandler = switchHandler;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.setNewListHandler(this.switchProject.bind(this));
    }

    switchProject(projectId) {
        // // First way of doing
        // this.switchHandler(this.projects.find(p => p.id === projectId));
        // const projectIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(projectIndex, 1);
        // Second way
        this.switchHandler(this.projects.find((p) => p.id === projectId));
        this.projects = this.projects.filter((p) => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished");
        activeProjectList.setSwitchHandler(
            finishedProjectList.addProject.bind(finishedProjectList)
        );
        finishedProjectList.setSwitchHandler(
            activeProjectList.addProject.bind(activeProjectList)
        );
    }
}

App.init();
