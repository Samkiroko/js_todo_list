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

import {getColorForButton, generateId} from "./common";
import {projectList} from "./projectlist";
import {hasElementInLocalStorage, loadObjectFromLocalStorage, setItemToLocalStorage} from "./localstorage";

export class Task {

    constructor(addTaskButton, cancelTaskButton, newTaskBtn, saveTaskSettingBtn, cancelTaskSettingBtn) {
        this.addTaskButton = addTaskButton;
        this.cancelTaskButton = cancelTaskButton;
        this.newTaskBtn = newTaskBtn;
        this.saveTaskSettingBtn = saveTaskSettingBtn;
        this.cancelTaskSettingBtn = cancelTaskSettingBtn;

        if (hasElementInLocalStorage()) {
            this.renderTaskFromLocalStorage();
            this.taskList = [];

        } else {
            this.taskList = [];
        }
    }

    renderTaskFromLocalStorage() {
        let tmpObj = loadObjectFromLocalStorage();
        localStorage.clear();
        tmpObj = [...new Set(tmpObj)];
        tmpObj.forEach(project => {
            project.TaskList.forEach(task => {
                let isDone = false;
                if (task.IsDone === "true") {
                    isDone = true;
                } else {
                    isDone = false;
                }
                this.renderNewTask(project.TaskSpaceId, task.Title, task.TaskId, isDone);
            })
        });
        setItemToLocalStorage(projectList);
    }

    showTaskModal() {
        this.addTaskButton.addEventListener('click', () => {
            $('#taskModal').modal('show');
            getColorForButton(this.addTaskButton, 'bg-success');
        });
    }

    clickOnNewTaskButton() {
        this.newTaskBtn.addEventListener('click', () => {
            getColorForButton(this.newTaskBtn, 'bg-success');
            this.getActiveProject();
            const taskSpaceId = 'taskSpace' + this.getActiveProject();
            const [taskTitle, id] = this.addTaskInfoToTaskList();
            this.renderNewTask(taskSpaceId, taskTitle, id);
            $('#taskModal').modal('hide');
            this.clearTaskModalWindow();
            localStorage.clear();
            setItemToLocalStorage(projectList);

        });
    }

    clickOnCancelProjectButton() {
        this.cancelTaskButton.addEventListener('click', () => {
            getColorForButton(this.cancelTaskButton, 'bg-danger');
        });
    }

    clickOnSaveTaskSettingButton() {
        this.saveTaskSettingBtn.addEventListener('click', (e) => {
            getColorForButton(this.saveTaskSettingBtn, 'bg-success');
            const currentElement = e.target;
            this.rewriteTaskInfo();
            $('#taskSettingModal').modal('hide');
            if (currentElement.classList.contains('taskTitle')) {

            }
            localStorage.clear();
            setItemToLocalStorage(projectList);

        });

    }

    clickOnCancelTaskSettingButton() {
        this.cancelTaskSettingBtn.addEventListener('click', () => {
            getColorForButton(this.cancelTaskSettingBtn, 'bg-danger');
        })
    }




    renderNewTask(pTaskSpace, pTaskTitle = "", id, isDone) {
        // declare
        const taskSpace = document.querySelector('#' + pTaskSpace);
        const taskRow = document.createElement('div');
        const checkboxSpace = document.createElement('div');
        const parentCheckbox = document.createElement('div');
        const checkbox = document.createElement('input');
        // title
        const taskTitle = document.createElement('div');
        // trash
        const trashSpace = document.createElement('div');
        const trash = document.createElement('i');

        // add attriutes
        taskRow.setAttribute('class', 'form-row pb-3 taskItem d-flex justify-content-between');
        // Реализовать уникальный айди, по которому удалять задачи из таск листа, просматрвать инфу о задаче и редактировать ее
        taskRow.setAttribute('id', id);

        checkboxSpace.setAttribute('class', 'col-md-1');
        parentCheckbox.setAttribute('class', 'custom-control custom-checkbox myInput custom-control-indicator');
        checkbox.setAttribute('class', 'checkbox-1x');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('aria-label', 'Checkbox for following text input');
        taskTitle.setAttribute('class', 'col-md-9 d-flex justify-content-md-start taskTitle');
        // trash
        trashSpace.setAttribute('class', 'col-md-1 d-flex justify-content-md-end pt-1 trash');
        trash.setAttribute('class', 'fa fa-trash taskTrash');
        trash.setAttribute('are-hidden', 'true');
        // text content
        taskTitle.textContent = pTaskTitle;
        // append
        taskSpace.appendChild(taskRow);
        taskRow.appendChild(checkboxSpace);
        checkboxSpace.appendChild(parentCheckbox);
        parentCheckbox.appendChild(checkbox);
        taskRow.appendChild(taskTitle);
        // trash
        taskRow.appendChild(trashSpace);
        trashSpace.appendChild(trash);
        // pass variables
        checkbox.checked = isDone;



    }

    deleteTask(element) {
        element.addEventListener('click', (e) => {
            const currentElement = e.target;

            if (currentElement.getAttribute('fill') === 'currentColor' && currentElement.parentElement.classList.contains('taskTrash')) {
                for (let project of projectList) {
                    for (let task of project.TaskList) {
                        if (currentElement.parentElement.parentElement.parentElement.id === task.TaskId) {

                        }
                    }
                }
                currentElement.parentElement.parentElement.parentElement.remove();
            }
            localStorage.clear();
            setItemToLocalStorage(projectList);
        });
    }

    addTaskInfoToTaskList() {
        const id = generateId();
        const titleTask = document.querySelector('#inputTitleTask');
        const description = document.querySelector('#description');
        const urgency = document.querySelector('#urgency');
        const date = document.querySelector('#taskDate');
        this.taskList.push(this.createTaskObject(generateId(), 'false', titleTask.value, description.value, urgency.value, date.value));
        const projectId = this.getActiveProject();
        projectList.forEach(project => project["ProjectId"] === projectId ?
            project["TaskList"].push(this.createTaskObject(id, 'false', titleTask.value, description.value, urgency.value, date.value)) :
            "");
        localStorage.clear();
        setItemToLocalStorage(projectList);
        return [titleTask.value, id];
    }


    createTaskObject(taskId, isDone, title, description, urgency, date) {
        return {
            TaskId: taskId,
            IsDone: isDone,
            Title: title,
            Description: description,
            Urgency: urgency,
            Date: date
        }
    }

    getActiveProject() {
        const projects = document.querySelectorAll('.item');
        let isActiveProject = '';
        for (let item of projects) {
            if (item.getAttribute('isactive') === 'true') {
                isActiveProject = item;
            }
        }
        return isActiveProject.id;
    }

    taskSetting(element) {
        element.addEventListener('click', (e) => {
            const currentElement = e.target;
            if (currentElement.classList.contains('taskTitle')) {
                $('#taskSettingModal').modal('show');
                this.showTaskInfo(currentElement);
            }
        });
    }


    clearTaskModalWindow() {
        const inputTitleTask = document.querySelector('#inputTitleTask');
        const description = document.querySelector('#description');
        const urgency = document.querySelector('#urgencyTaskSetting');
        const taskDate = document.querySelector('#taskDate');

        inputTitleTask.value = "";
        description.value = "";
        urgency.value = "";
        taskDate.value = "";
    }

    showTaskInfo(target) {
        const title = document.querySelector('#inputTitleTaskSetting');
        const description = document.querySelector('#descriptionTaskSetting');
        const urgency = document.querySelector('#urgencyTaskSetting');
        const date = document.querySelector('#dataTaskSetting');
        const rewriteTaskId = document.querySelector('#forRewriteTaskId');
        const taskId = target.parentNode.id;
        rewriteTaskId.setAttribute('style', 'display: none !important;');
        for (let project of projectList) {
            for (let task of project.TaskList) {
                if (task.TaskId === taskId) {
                    rewriteTaskId.textContent = task.TaskId;
                    title.value = task.Title;
                    description.value = task.Description;
                    date.value = task.Date;
                    urgency.value = task.Urgency;
                }
            }
        }
    }

    rewriteTaskInfo() {
        const title = document.querySelector('#inputTitleTaskSetting');
        const description = document.querySelector('#descriptionTaskSetting');
        const urgency = document.querySelector('#urgencyTaskSetting');
        const date = document.querySelector('#dataTaskSetting');
        const rewriteTaskId = document.querySelector('#forRewriteTaskId');
        for (let project of projectList) {
            for (let task of project.TaskList) {
                if (task.TaskId === rewriteTaskId.textContent) {
                    task.Title = title.value;
                    task.Description = description.value;
                    task.Date = date.value;
                    task.Urgency = urgency.value;
                    let tmpTaskId = document.querySelector('#' + task.TaskId).childNodes;
                    tmpTaskId[1].textContent = task.Title;
                }
            }
        }
        localStorage.clear();
        setItemToLocalStorage(projectList);
    }

    getDoneTask(element) {
        element.addEventListener('click', (e) => {
            const currentElement = e.target;
            if (currentElement.classList.contains('checkbox-1x')) {
                let currentTaskId = currentElement.parentElement.parentElement.parentElement.id;
                for (let project of projectList) {
                    for (let task of project.TaskList) {
                        if (currentTaskId === task.TaskId) {
                            if(task.IsDone === 'true') {
                                task.IsDone = 'false';
                            } else {
                                task.IsDone = 'true';
                            }
                        }
                    }
                }
            }
            localStorage.clear();
            setItemToLocalStorage(projectList);
        });
    }
}