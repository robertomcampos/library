import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

import api from '../../services/api'

import './styles.scss';

export default function Login() {

    const initialState = {
        email: '',
        password: '',
        location: useLocation()
    }

    const [state, setState] = useState(initialState);
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        api.post('authenticate', {
            email: state.email,
            password: state.password,
        }).then(result => {
            localStorage.setItem('loggedUser', JSON.stringify(result.data));

            const redirect = state.location.state && state.location.state.from
                && state.location.state.from.pathname;

            history.push(redirect || '/');
        }).catch(e => { console.log(e) });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Email"
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })}
                    />
                    <input
                        placeholder="Senha"
                        value={state.password}
                        type="password"
                        onChange={e => setState({ ...state, password: e.target.value })}
                    />
                    <div className="button-area">
                        <button className="primary button" type="submit">Entrar</button>
                    </div>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#41414d" />
                        Criar nova conta
                    </Link>
                </form>
            </section>
        </div >
    );
}