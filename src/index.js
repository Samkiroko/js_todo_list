import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/popper-utils.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.css';

//import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import {Project} from './modules/project.js';
import {Task} from './modules/task.js';
import './css/index.css';


document.addEventListener('DOMContentLoaded', function () {
    const addProjectBtn = document.querySelector('#addProjectBtn');
    const projectModal = document.querySelector('#projectModal');
    const newProjectBtn = document.querySelector('#newProjectBtn');
    const cancelProjectBtn = document.querySelector('#cancelProjectBtn');
    const projectSpace = document.querySelector('.items');
    const addTaskButton = document.querySelector('#addTaskButton');
    const cancelTaskBtn = document.querySelector('#cancelTaskBtn');
    const newTaskBtn = document.querySelector('#newTasktBtn');
    const taskEdit = document.querySelector('#tasks');
    const cancelTaskSetting = document.querySelector('#cancelTaskSetting');
    const saveTaskSetting = document.querySelector('#saveTaskSetting');


    const project = new Project(addProjectBtn, newProjectBtn, cancelProjectBtn);
    const task = new Task(addTaskButton, cancelTaskBtn, newTaskBtn, saveTaskSetting ,cancelTaskSetting);


    task.showTaskModal();
    project.showProjectModalWindow(projectModal);
    project.clickOnCancelProjectButton();
    project.clickOnNewProjectButton(newProjectBtn);
    project.selectProject(projectSpace);
    project.deleteProject(projectSpace);

    task.clickOnNewTaskButton();
    task.clickOnCancelProjectButton();

    task.taskSetting(taskEdit);
    task.deleteTask(taskEdit);
    task.clickOnCancelTaskSettingButton();
    task.clickOnSaveTaskSettingButton();
    task.getDoneTask(taskEdit);



});