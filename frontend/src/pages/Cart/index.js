import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import moment from 'moment';

import DatePicker, { registerLocale } from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import Header from '../Header';

import api from '../../services/api'
import getUser from '../../services/getUser'
import { getStoredBooks, setStoredBooks, clearStoredBooks } from '../../services/manageStoredBooks'

import './styles.scss';

export default function Cart() {

    registerLocale("br", br);

    const initialState = {
        storedBooks: [],
        user: {},
        startDate: moment().toDate(),
        endDate: moment().add(1, 'days').toDate(),
        loading: true,
    };

    const [state, setState] = useState(initialState);

    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        if (!getStoredBooks()) {
            alert('Nenhum item foi selecionado.')
            history.push('/');
        }

        const storedBooks = getStoredBooks();

        if (!storedBooks) {
            alert('Nenhum livro selecionado');
            history.push('/');
        }

        setState({
            ...initialState,
            storedBooks,
            user: getUser(),
            loading: false,
        });
    }

    function handleRemoveItem(book) {
        const newStoredBooks = state.storedBooks.filter(x => x !== book)
        setStoredBooks(newStoredBooks);
        setState({ ...state, storedBooks: newStoredBooks });
    }

    function handleConfirm() {
        api.post('reservations', {
            startsOn: state.startDate.toJSON(),
            endsOn: state.endDate.toJSON(),
            books: state.storedBooks.map(x => x.id)
        },
            {
                headers: {
                    authorization: getUser().id
                }
            }).then(result => {
                clearStoredBooks();
                console.log(result);
                history.push({
                    pathname: '/protocol',
                    state: { ...result.data }
                });

            }).catch(e => { console.log(e) });
    }

    if (state.loading)
        return (<div></div>);

    return (
        <div className="cart-container">
            <Header />
            <h1>Confirmação da reserva</h1>
            <div className="period">
                <div className="input">
                    <strong>Data de início</strong>
                    <DatePicker readOnly={true} selected={state.startDate} onChange={date => setState({ ...state, startDate: date })} />
                </div>
                <div className="input">
                    <strong>Data de devolução</strong>
                    <DatePicker locale="br" selected={state.endDate} onChange={date => setState({ ...state, endDate: date })} />
                </div>
            </div>
            <ul>
                {state.storedBooks.map(book => (
                    <li key={book.id}>
                        <div>
                            <a onClick={e => handleRemoveItem(book)}>Remover</a>
                        </div>
                        <div>
                            <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                            <div>
                                <p><strong>Livro: {book.name}</strong></p>
                                <p><strong> Gênero:</strong> {book.categoryName}</p>
                                <p><strong> Autor:</strong> {book.author}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="button-area">
                <button onClick={() => handleConfirm()} type="button" className="primary btnSave">
                    Confirmar Reserva
            </button>
            </div>
        </div>
    );
}