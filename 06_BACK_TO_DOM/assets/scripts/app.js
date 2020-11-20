/*
    PROJECT JS - Back to DOM and more Borwser APIs
    codeKiwi
    20/11/2020
*/

// Generic class which provides tools for dealing with DOM changes
class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        // When we append an element from the DOM somewhere else in the DOM
        // It is moved, not copyied or anything else
        destinationElement.append(element);
        element.scrollIntoView({ behavior: "smooth" });
    }

    static clearEventListeners(element) {
        // We clone the element -> true for deep clone
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
    }
}

// Generic class for DOM components
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
    constructor(text, closeNotifierFunction, hostElementId) {
        super(hostElementId, false);
        this.text = text;
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip() {
        this.hide();
        this.closeNotifier();
        App.startAnalytics();
    }

    create() {
        const tooltipElement = document.createElement("div");
        this.element = tooltipElement;
        tooltipElement.className = "card";

        // We use this template way in order to avoid html code inside of JS code
        const tooltipTemplate = document.getElementById("tooltip");
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector("p").textContent = this.text;
        this.element.append(tooltipBody);

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight; // Exclude border
        const parentElScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - 10 - parentElScrolling;

        tooltipElement.style.position = "absolute";
        tooltipElement.style.left = `${x}px`;
        tooltipElement.style.top = `${y}px`;

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
        moreInfoButton.addEventListener(
            "click",
            this.showMoreInfoHandler.bind(this)
        );
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
        const projectElement = document.getElementById(this.id);
        const tooltip = new Tooltip(
            projectElement.dataset.extraInfo,
            () => {
                this.hasActiveTooltip = false;
            },
            this.id
        );
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

        // Adding start analytics interaction
        let timerId, isSending = false;
        const startAnalyticsButton = document.getElementById(
            "start-analytics-btn"
        );
        startAnalyticsButton.addEventListener("click", () => {
            if (isSending) {
                return;
            }
            isSending = true;
            timerId = setInterval(this.startAnalytics, 1000);
        });

        // Adding the possibility to stop the analytics
        const stopAnalyticsButton = document.getElementById(
            "stop-analytics-btn"
        );
        stopAnalyticsButton.addEventListener("click", () => {
            if (!isSending) {
                return;
            }
            isSending = false;
            clearInterval(timerId);
        });
    }

    static startAnalytics() {
        const analyticsScript = document.createElement("script");
        analyticsScript.src = "./assets/scripts/analytics.js";
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init();
