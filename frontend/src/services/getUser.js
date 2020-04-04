export default function getUser() {
    return localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : undefined;
}