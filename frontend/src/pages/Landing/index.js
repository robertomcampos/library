import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.scss';

export default function Landing() {
    const [books, setBooks] = useState([]);
    const [storedBooks, setStoredBooks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    function handleAddBook(book) {
        if (!storedBooks.includes(book)) {
            return setStoredBooks([...storedBooks, book]);
        }
        return setStoredBooks(storedBooks.filter(x => x !== book));
    }

    async function fetchData() {
        const books = await api.get('books');
        setBooks(books.data);

        const storedBooks = localStorage.getItem('storedBooks');
        if (storedBooks) {
            setStoredBooks(JSON.parse(storedBooks));
        }
    }

    function handleReservation() {
        if (storedBooks.length) {
            localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
            return history.push('/cart');
        }

        alert('Nenhum livro foi selecionado');
    }

    const isStored = bookId => storedBooks.find(x => x.id == bookId);

    function handleClear() {
        localStorage.removeItem('storedBooks');
        setStoredBooks([]);
    }

    return (
        <div className="books-container">
            <h1>Livros</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                        <div>
                            <div className="title">Título: {book.name}</div>
                            <p><strong>Autor:</strong>{book.author}</p>
                            <p><strong>Gênero:</strong>{book.categoryName}</p>
                            <button onClick={() => handleAddBook(book)} type="button">
                                {isStored(book.id) ? 'remover' : 'adicionar'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleClear()} type="button" className="btnSave">
                Limpar
            </button>
            <button onClick={() => handleReservation()} type="button" className="btnSave">
                Reservar
            </button>
        </div >
    );
}