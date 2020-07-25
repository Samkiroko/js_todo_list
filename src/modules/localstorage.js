export function setItemToLocalStorage(item, key = 'ProjectList') {
    let serialItem = JSON.stringify(item);
    localStorage.setItem('ProjectList', serialItem);
}

export function hasElementInLocalStorage() {
    if (localStorage.getItem("ProjectList") !== null) {
        return true;
    } else {
        return false;
    }
}

export function loadObjectFromLocalStorage() {
    return JSON.parse(localStorage.getItem('ProjectList'));
}
