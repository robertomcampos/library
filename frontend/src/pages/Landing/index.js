import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FiShoppingCart } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { getBooks, getBooksByCategory, clearBooks } from '../../store/Books/actions';
import { getCategories } from '../../store/Categories/actions';
import { addStoredBooks, clearStoredBooks } from '../../store/StoredBooks/actions';

import './styles.scss';

export default function Landing() {

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [pageLoading, setPageLoading] = useState(true);

    const { content: books, page: page, total, limit } = useSelector(state => state.books.data);
    const { data: categories } = useSelector(state => state.categories);
    const { data: storedBooks } = useSelector(state => state.storedBooks);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (books.length) {
            setPageLoading(false);
        }
    }, [books, categories]);

    const isStored = bookId => storedBooks.find(x => x.id == bookId);

    function handleStoredBooks(book) {
        if (!storedBooks.find(x => x.id === book.id)) {
            return addBook(book)
        }
        removeStoredBook(book);
    }

    function fetchData() {
        dispatch(clearBooks());
        dispatch(getBooks());
        dispatch(getCategories());
    }

    function addBook(book) {
        const booksToStore = [...storedBooks, book];
        dispatch(addStoredBooks(booksToStore));
    }

    function removeStoredBook(book) {
        const booksToRemove = storedBooks.filter(x => x.id !== book.id);
        dispatch(addStoredBooks(booksToRemove));
    }

    function handleReservation() {
        if (storedBooks.length) {
            return history.push('/cart');
        }

        alert('Nenhum livro foi selecionado');
    }

    function handleChangeCategory(e) {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        dispatch(clearBooks());
        categoryId === "0" ? dispatch(getBooks()) : dispatch(getBooksByCategory(categoryId));
    }

    function handleClear() {
        dispatch(clearStoredBooks());
    }

    function handlePagination() {
        if (selectedCategory) {
            return dispatch(getBooksByCategory(selectedCategory, page + 1));
        }
        dispatch(getBooks(page + 1));
    }

    if (pageLoading)
        return (<Loading />);

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
                            <button className={classNames('primary', { secundary: isStored(book.id) })} onClick={() => handleStoredBooks(book)} type="button">
                                <FiShoppingCart size={16} color="#FFFFFF" />
                                <span>{isStored(book.id) ? 'Remover' : 'Adicionar'}</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {!(page >= (total / limit)) && (
                <div className="show-more">
                    <button onClick={handlePagination} type="button" className="primary">Ver mais</button>
                </div>
            )}
            <div className="button-area">
                <button disabled={!storedBooks.length} onClick={handleReservation} type="button" className="primary btnSave">Reservar</button>
                <button disabled={!storedBooks.length} onClick={handleClear} type="button" className="secundary btnClear">Limpar</button>
            </div>
        </div >
    );
}