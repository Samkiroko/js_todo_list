/* eslint-disable import/extensions */
/* eslint-disable default-case */
/*  eslint-disable no-restricted-syntax */
/*  eslint-disable  no-unused-vars */

export function setItemToLocalStorage(item, key = 'ProjectList') {
  const serialItem = JSON.stringify(item);
  localStorage.setItem('ProjectList', serialItem);
}

export function hasElementInLocalStorage() {
  if (localStorage.getItem('ProjectList') !== null) {
    return true;
  }
  return false;
}

export function loadObjectFromLocalStorage() {
  return JSON.parse(localStorage.getItem('ProjectList'));
}
