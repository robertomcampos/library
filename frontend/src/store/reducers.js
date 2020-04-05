import { combineReducers } from 'redux';
import books from './Books/reducer';
import categories from './Categories/reducer';
import reservation from './Reservation/reducer';
import user from './User/reducer';
import authentication from './Authentication/reducer';
import storedBooks from './StoredBooks/reducer';

export default combineReducers({
    books,
    categories,
    reservation,
    user,
    authentication,
    storedBooks,
});