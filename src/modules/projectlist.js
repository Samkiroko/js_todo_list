export let projectList = [];
export let globalTaskId = [];
export function deletePeojectFromArray(arr, value) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i].ProjectId === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

export function getPtojectId(element) {
    return target.parentNode.id;
}

