export function getLoggedUser() {
    return localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : undefined;
}

export function setLoggedUser(user) {
    return localStorage.setItem('loggedUser', JSON.stringify(user));
}

export function clearLoggedUser() {
    return localStorage.removeItem('loggedUser');
}
