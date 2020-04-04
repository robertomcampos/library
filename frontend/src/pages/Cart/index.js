import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit } from 'react-icons/fi';

import api from '../../services/api'
import getUser from '../../services/getUser'

import './styles.css';

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

        if(!storedBooks) {
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

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    if (state.loading)
        return (<div></div>);

    return (
        <div className="profile-container">
            <header>
                <span>Olá, {state.user.name}</span>
                <Link className="back-link" to="/">
                    <FiEdit size={16} color="#3D94F6" />
                        Alterar a reserva
                    </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>
            <h1>Confirmação de reserva</h1>
            <ul>
                {state.storedBooks.map(book => (
                    <li key={book.id}>
                        <strong>Livro: </strong>
                        <p>{book.name}</p>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleConfirm()} type="button" className="btnSave">
                Confirmar Reserva
            </button>
        </div>
    );
}