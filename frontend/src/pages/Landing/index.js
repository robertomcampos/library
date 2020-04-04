import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FiShoppingCart } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
import Header from '../Header';

import api from '../../services/api'
import { setStoredBooks as setStoredBooksService, getStoredBooks } from '../../services/manageStoredBooks';

import './styles.scss';
import { getBooks } from '../../store/Books/actions';

export default function Landing() {

    const [categories, setCategories] = useState([]);
    const [storedBooks, setStoredBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [pageLoading, setPageLoading] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { data: books, loading } = useSelector(state => state.books);

    useEffect(() => {
        fetchData();
    }, [])

    function handleAddBook(book) {
        let _storedBooks;
        if (!storedBooks.includes(book)) {
            _storedBooks = [...storedBooks, book];
            setStoredBooksService(_storedBooks);
            return setStoredBooks(_storedBooks);
        }
        _storedBooks = storedBooks.filter(x => x !== book)
        setStoredBooksService(_storedBooks);
        return setStoredBooks(_storedBooks);
    }

    useEffect(() => {
        if (books.length) {
            api.get('categories').then(result => {
                setCategories(result.data);
                const storedBooks = getStoredBooks();
                setStoredBooks(storedBooks || []);
                setPageLoading(false);
            });
        }
    }, [books]);

    async function fetchData() {
        dispatch(getBooks());
        /* const categories = await api.get('categories');
        const storedBooks = getStoredBooks();

        setState({
            ...state,
            books: books.data,
            categories: categories.data,
            storedBooks: storedBooks || state.storedBooks,
            loading: false,
        }); */
    }

    function handleReservation() {
        if (storedBooks.length) {
            return history.push('/cart');
        }

        alert('Nenhum livro foi selecionado');
    }

    async function handleChangeCategory(e) {
        const categoryId = e.target.value;
        const endpoint = categoryId === "0" ? '' : `categories/${categoryId}`;

        const books = await api.get(`books/${endpoint}`);
        setSelectedCategory(categoryId);
        /* setState({
            ...state,
            books: books.data,
            selectedCategory: categoryId,
        }); */
    }

    const isStored = bookId => storedBooks.find(x => x.id == bookId);

    function handleClear() {
        localStorage.removeItem('storedBooks');
        setStoredBooks([]);
    }

    if (pageLoading)
        return (<div></div>);

    return (
        <div className="books-container">
            <Header />
            <h1>Escolha os livros para sua reserva</h1>
            <div className="filter">
                <div className="custom-select">
                    <select value={selectedCategory} onChange={handleChangeCategory}>
                        <option value="0">Todos</option>
                        {categories.map(x => (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                        <div>
                            <div className="title">Título: {book.name}</div>
                            <p><strong>Autor: </strong>{book.author}</p>
                            <p><strong>Gênero: </strong>{book.categoryName}</p>
                            <button className={classNames('primary', { secundary: isStored(book.id) })} onClick={() => handleAddBook(book)} type="button">
                                <FiShoppingCart size={16} color="#FFFFFF" />
                                <span>{isStored(book.id) ? 'Remover' : 'Adicionar'}</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="button-area">
                <button disabled={!storedBooks.length} onClick={() => handleReservation()} type="button" className="primary btnSave">Reservar</button>
                <button disabled={!storedBooks.length} onClick={() => handleClear()} type="button" className="secundary btnClear">Limpar</button>
            </div>
        </div >
    );
}