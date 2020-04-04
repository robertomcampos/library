import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit } from 'react-icons/fi';
import Header from '../Header';

import api from '../../services/api'
import getUser from '../../services/getUser'

import './styles.scss';

export default function Cart() {

    const initialState = {
        storedBooks: [],
        user: {},
        loading: true,
    };

    const [state, setState] = useState(initialState);

    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        const storedBooks = JSON.parse(localStorage.getItem('storedBooks'));

        if (!storedBooks) {
            alert('Nenhum livro selecionado');
            history.push('/');
        }

        setState({
            storedBooks,
            user: getUser(),
            loading: false,
        });
    }

    async function handleDeleteIncident(id) {
        /* try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            fetchData();
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        } */
    }

    function handleConfirm() {
        api.post('reservations', {
            startsOn: '',
            endsOn: '',
            books: state.storedBooks.map(x => x.id)
        },
            {
                headers: {
                    authorization: getUser().id
                }
            }).then(result => {
                console.log(result);
                localStorage.removeItem('storedBooks');
                history.push(`/protocol?p=${result.data.protocol}`);
            }).catch(e => { console.log(e) });
    }

    if (state.loading)
        return (<div></div>);

    return (
        <div className="cart-container">
            <Header />
            <h1>Confirmação de reserva</h1>
            <ul>
                {state.storedBooks.map(book => (
                    <li key={book.id}>
                        <img src={`../../../images/books/thumbs/${book.thumbnail}`} alt={book.name} />
                        <div>
                            <p><strong>Livro: {book.name}</strong></p>
                            <p><strong> Gênero:</strong> {book.categoryName}</p>
                            <p><strong> Autor:</strong> {book.author}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="button-area">
                <button onClick={() => handleConfirm()} type="button" className="btnSave">
                    Confirmar Reserva
            </button>
            </div>
        </div>
    );
}