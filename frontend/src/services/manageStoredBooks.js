export function setStoredBooks(books) {
    return localStorage.setItem('storedBooks', JSON.stringify(books));
}

export function getStoredBooks() {
    return localStorage.getItem('storedBooks') ? JSON.parse(localStorage.getItem('storedBooks')) : undefined;
}

export function clearStoredBooks() {
    return localStorage.removeItem('storedBooks');
}