import {loadObjectFromLocalStorage} from "./localstorage";


export function getColorForButton(button, color) {
    button.setAttribute('class', color);
    setTimeout(() => {
        button.classList.remove(color);
    }, 200);
}

export function generateId() {
    try {
        const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
        return id;
    } catch (e) {
        console.log(e);
    }
}

export function inactiveElement(div) {
    for (let item of div) {
        item.setAttribute('isActive', 'false');
        item.classList.remove('border');
        item.classList.remove('order-danger');
    }
}

export function activeElement(div) {
    div.setAttribute('isActive', 'true');
    div.classList.add('border');
    div.classList.add('border-success');
}

export function checkHasProject() {
    let obj = loadObjectFromLocalStorage();
    const addTaskButton = document.querySelector('#addTaskButton');
    if (obj == null || obj.length === 0) {
        addTaskButton.style.visibility = 'hidden';
    } else {
        addTaskButton.style.visibility = 'visible';
    }
}
