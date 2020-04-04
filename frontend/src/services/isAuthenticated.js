export default function isAuthenticated() {
    // dummy authentication
    return localStorage.getItem('loggedUser');
}