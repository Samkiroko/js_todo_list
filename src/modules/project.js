import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/popper-utils.min';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import {getColorForButton, generateId, inactiveElement, activeElement, checkHasProject} from "./common";
import {projectList} from "./projectlist";
import {
    setItemToLocalStorage,
    hasElementInLocalStorage,
    loadObjectFromLocalStorage
} from "./localstorage";

export class Project {

    constructor(addProjectBtn, newProjectBtn, cancelProjectButton) {
        this.addProjectBtn = addProjectBtn;
        this.newProjectBtn = newProjectBtn;
        this.cancelProjectButton = cancelProjectButton;
        checkHasProject();
        if (hasElementInLocalStorage()) {
            this.renderProjectFromLocalStorage();
        }
    }

    showProjectModalWindow(projectFormId) {
        this.addProjectBtn.addEventListener('click', () => {
            $(projectFormId).modal('show');
            getColorForButton(this.addProjectBtn, 'bg-success');
        });
    }

    clickOnCancelProjectButton() {
        this.cancelProjectButton.addEventListener('click', () => {
            getColorForButton(this.cancelProjectButton, 'bg-danger');
        });
    }

    clickOnNewProjectButton() {
        this.newProjectBtn.addEventListener('click', () => {
            localStorage.clear();
            getColorForButton(this.newProjectBtn, 'bg-success');
            this.copyDataToProjectSpace();
            $("#projectModal").modal('hide');
            this.clearModalProjectWindow();
            setItemToLocalStorage(projectList);
            checkHasProject();

        });
    }

    copyDataToProjectSpace() {
        const inputElement = document.querySelector('#inputTitleProject');
        this.renderNewProject(inputElement.value, generateId());
    }

    clearModalProjectWindow() {
        const inputElement = document.querySelector('#inputTitleProject');
        inputElement.value = "";
    }

    renderProjectFromLocalStorage() {
        let tmpObj = loadObjectFromLocalStorage();
        localStorage.clear();
        tmpObj = [...new Set(tmpObj)];
        tmpObj.forEach(project => {
            this.renderNewProject(project.ProjectName, project.ProjectId, project.TaskList);
            project.TaskList.forEach(task => {

            })
        });
        setItemToLocalStorage(projectList);
    }


    renderNewProject(projectName, idParam, taskList = []) {
        const elements = document.getElementsByClassName("item");
        const tasks = document.querySelector('#tasks');
        const taskSpace = document.createElement('div');
        const taskSpaceFirstDiv = document.createElement('div');
        const items = document.querySelector('#itemsId');
        const mainDiv = document.createElement('div');
        const name = document.createElement('div');
        const icon = document.createElement('i');
        mainDiv.setAttribute('class', 'pb-2 bd-highlight item d-flex justify-content-between pr-2');
        mainDiv.setAttribute('id', idParam);
        mainDiv.setAttribute('isActive', 'true');
        name.setAttribute('class', 'd-flex  pt-1 pb-1 pr-5 pl-1 itemText');
        icon.setAttribute('class', 'fa fa-minus-square mt-2 itemIcon');
        taskSpace.setAttribute('class', 'd-flex flex-column bd-highlight text-light mb-3 spaces');
        taskSpace.setAttribute('id', 'taskSpace' + idParam);
        taskSpaceFirstDiv.setAttribute('class', 'pt-3');
        items.appendChild(mainDiv);
        mainDiv.appendChild(name);
        mainDiv.appendChild(icon);
        tasks.insertBefore(taskSpace, tasks.children[1]);
        taskSpace.appendChild(taskSpaceFirstDiv);
        name.textContent = projectName;
        inactiveElement(elements);
        activeElement(mainDiv);
        this.openTaskSpace(idParam);
        projectList.push(this.createProjectObject(projectName, idParam, 'taskSpace' + idParam, taskList));

        return mainDiv;
    }

    createProjectObject(projectName, projectId, taskSpaceId, taskList) {
        return {
            ProjectName: projectName,
            ProjectId: projectId,
            TaskSpaceId: taskSpaceId,
            TaskList: taskList
        }
    }

    openTaskSpace(id) {
        const spaceId = 'taskSpace' + id;
        const mainTaskSPaceDiv = document.querySelectorAll('.spaces');
        for (let item of mainTaskSPaceDiv) {
            if (item.id != 'taskSpace1') {
                item.setAttribute('style', 'display: none !important;');
            }
            if (item.id === spaceId) {
                item.setAttribute('style', 'display: block !important;');
            }
        }
    }

    selectProject(element) {

        element.addEventListener('click', (e) => {
            const currentElement = e.target;
            if (currentElement.classList.contains("item")) {
                const elements = document.getElementsByClassName("item");
                inactiveElement(elements);
                currentElement.classList.add('border');
                currentElement.classList.add('border-success');
                const itemId = currentElement.getAttribute('id');
                activeElement(currentElement);
                this.openTaskSpace(itemId);
            }
            if (currentElement.parentElement.classList.contains("item")) {
                const elements = document.getElementsByClassName("item");
                inactiveElement(elements);
                currentElement.parentElement.classList.add('border');
                currentElement.parentElement.classList.add('border-success');
                const itemId = currentElement.parentElement.getAttribute('id');
                activeElement(currentElement.parentElement);
                this.openTaskSpace(itemId);
            }
        });
    }

    deleteProject(element) {
        element.addEventListener('click', (e) => {
            const currentElement = e.target;
            if (currentElement.classList.contains("itemIcon")) {
                const projectId = currentElement.parentElement.id;
                this.deleteProjectFromProjectList(projectId);
                this.deleteTaskSpace(projectId);
                currentElement.parentElement.remove();
                localStorage.clear();
                setItemToLocalStorage(projectList);

            }
            if (currentElement.hasAttribute("fill")) {
                const projectId = currentElement.parentElement.parentElement.id;
                this.deleteProjectFromProjectList(projectId);
                this.deleteTaskSpace(projectId);
                currentElement.parentElement.parentElement.remove();
                localStorage.clear();
                setItemToLocalStorage(projectList);
            }
            checkHasProject();
        });
    }

    deleteProjectFromProjectList(projectId) {
        projectList.map((project, index) => {
            if (projectList[index].ProjectId === projectId) {
                projectList.splice(projectList.indexOf(projectList[index]), 1);
            }
        });
    }

    deleteTaskSpace(projectId) {
        const tasksDiv = document.querySelectorAll('.spaces');
        tasksDiv.forEach(div => {
            if ('taskSpace' + projectId === div.id) {
                div.remove();
            }
        });
    }

}

