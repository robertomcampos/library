import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { FiShoppingCart } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import Header from '../Header';

import api from '../../services/api'

import './styles.scss';

export default function Landing() {

    const initialState = {
        books: [],
        categories: [],
        storedBooks: [],
        selectedCategory: 0,
        loading: true,
    }

    const [state, setState] = useState(initialState);

    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    function handleAddBook(book) {
        if (!state.storedBooks.includes(book)) {
            return setState({
                ...state,
                storedBooks: [...state.storedBooks, book],
            });
        }
        return setState({
            ...state,
            storedBooks: state.storedBooks.filter(x => x !== book),
        });
    }

    async function fetchData() {
        const books = await api.get('books');
        const categories = await api.get('categories');
        const storedBooks = localStorage.getItem('storedBooks');

        setState({
            ...state,
            books: books.data,
            categories: categories.data,
            storedBooks: storedBooks ? JSON.parse(storedBooks) : state.storedBooks,
            loading: false,
        });
    }

    function handleReservation() {
        if (state.storedBooks.length) {
            localStorage.setItem('storedBooks', JSON.stringify(state.storedBooks));
            return history.push('/cart');
        }

        alert('Nenhum livro foi selecionado');
    }

    async function handleChangeCategory(e) {
        const categoryId = e.target.value;
        const endpoint = categoryId === "0" ? '' : `categories/${categoryId}`;

        const books = await api.get(`books/${endpoint}`);
        setState({
            ...state,
            books: books.data,
            selectedCategory: categoryId,
        });
    }

    const isStored = bookId => state.storedBooks.find(x => x.id == bookId);

    function handleClear() {
        localStorage.removeItem('storedBooks');
        setState({ ...state, storedBooks: [] });
    }

    if (state.loading)
        return (<div></div>);

    return (
        <div className="books-container">
            <Header />
            <h1>Escolha os livros para sua reserva</h1>
            <div className="filter">
                <div className="custom-select">
                    <select value={state.selectedCategory} onChange={handleChangeCategory}>
                        <option value="0">Todos</option>
                        {state.categories.map(x => (
                            <option key={x.id} value={x.id}>{x.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ul>
                {state.books.map(book => (
                    <li key={book.id}>
                        <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                        <div>
                            <div className="title">Título: {book.name}</div>
                            <p><strong>Autor: </strong>{book.author}</p>
                            <p><strong>Gênero: </strong>{book.categoryName}</p>
                            <button className={classNames({ stored: isStored(book.id) })} onClick={() => handleAddBook(book)} type="button">
                                <FiShoppingCart size={16} color="#FFFFFF" />
                                <span>{isStored(book.id) ? 'Remover' : 'Adicionar'}</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="button-area">
                <button disabled={!state.storedBooks.length} onClick={() => handleReservation()} type="button" className="btnSave">Reservar</button>
                <button disabled={!state.storedBooks.length} onClick={() => handleClear()} type="button" className="btnClear">Limpar</button>
            </div>
        </div >
    );
}