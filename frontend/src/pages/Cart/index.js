import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import { IoMdAdd } from 'react-icons/io';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { getLoggedUser } from '../../services/managerUser'
import { createReservation, clearReservation } from '../../store/Reservation/actions';
import { addStoredBooks, clearStoredBooks } from '../../store/StoredBooks/actions';

import './styles.scss';

export default function Cart() {

    const [user] = useState(getLoggedUser());
    const [startDate, setStartDate] = useState(moment().toDate());
    const [endDate, setEndDate] = useState(moment().add(1, 'days').toDate());
    const [pageLoading, setPageLoading] = useState(true);

    const { data: reservation } = useSelector(state => state.reservation);
    const { data: storedBooks } = useSelector(state => state.storedBooks);

    const history = useHistory();
    const dispatch = useDispatch();

    registerLocale("br", br);

    useEffect(() => {
        if (!storedBooks.length) {
            alert('O carrinho está vazio');
            history.push('/');
        }
        fetchData();
    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearReservation());
        }
    }, [])

    useEffect(() => {
        if (reservation) {
            dispatch(clearStoredBooks());
            history.push({
                pathname: '/protocol',
                state: reservation,
            });
        }
    }, [reservation])

    function fetchData() {
        validateStoredBooks(storedBooks);
        setPageLoading(false);
    }

    function validateStoredBooks(storedBooks) {
        if (!storedBooks) {
            alert('Nenhum livro selecionado');
            history.push('/');
        }
    }

    function handleRemoveItem(book) {
        if (storedBooks.length === 1) {
            return alert('A reserva só poderá ser realizada com pelo menos um livro no carrinho');
        }
        const newStoredBooks = storedBooks.filter(x => x !== book)
        dispatch(addStoredBooks(newStoredBooks));
    }

    function handleConfirm() {
        dispatch(createReservation({
            startsOn: startDate.toJSON(),
            endsOn: endDate.toJSON(),
            books: storedBooks.map(x => x.id)
        }, user.id));
    }

    if (pageLoading)
        return (<Loading />);

    return (
        <div className="cart-container">
            <Header />
            <h1>Confirmação da reserva</h1>
            <div className="period">
                <div className="input">
                    <strong>Data de início</strong>
                    <DatePicker readOnly={true} selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div className="input">
                    <strong>Data de devolução</strong>
                    <DatePicker
                        locale="br"
                        selected={endDate}
                        minDate={moment().add(1, 'days').toDate()}
                        onChange={date => setEndDate(date)}
                    />
                </div>
            </div>
            <ul>
                {storedBooks.map(book => (
                    <li key={book.id}>
                        <div>
                            <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                            <div>
                                <p><strong>Livro: {book.name}</strong></p>
                                <p><strong> Gênero:</strong> {book.categoryName}</p>
                                <p><strong> Autor:</strong> {book.author}</p>
                                <button disabled={!storedBooks.length} onClick={() => handleRemoveItem(book)} type="button" className="secundary">Remover</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="button-area">
                <button onClick={() => history.push('/')} type="button" className="primary btnSave">
                    <IoMdAdd size={20} className="add-icon" color="#FFF" />
                    Adicionar Livros
            </button>
                <button onClick={handleConfirm} type="button" className="primary btnSave">
                    Confirmar Reserva
            </button>
            </div>
        </div>
    );
}