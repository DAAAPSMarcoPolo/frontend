export function getFromLocalStorage(dataName) {
  if (typeof dataName === 'undefined' || typeof localStorage.getItem(dataName) === 'undefined') {
    return;
  }
  return JSON.parse(localStorage.getItem(dataName));
}

export function saveToLocalStorage(obj) {
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const str = JSON.stringify(obj[key]);
    localStorage.setItem(key, str);
  }
}
