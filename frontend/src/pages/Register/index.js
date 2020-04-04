import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.scss';

export default function Register() {

    const initialState = {
        name: '',
        email: '',
        password: ''
    }

    const [state, setState] = useState(initialState);

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name: state.name,
            email: state.email,
            password: state.password
        };

        try {
            const result = await api.post('users', data);

            localStorage.setItem('loggedUser', JSON.stringify(result.data));
            history.push('/cart');
        } catch (err) {
            alert('erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, e aproveite nosso catálogo de livros.</p>
                    
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome"
                        value={state.name}
                        onChange={e => setState({ ...state, name: e.target.value })} />
                    <input type="Email" placeholder="Email"
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })} />
                    <input placeholder="Senha"
                        value={state.password}
                        type="password"
                        onChange={e => setState({ ...state, password: e.target.value })} />
                    <div className="button-area">
                        <button className="primary button full" type="submit">
                            Criar conta
                        </button>
                    </div>
                    <Link className="back-link" to="/login">
                        <FiArrowLeft size={16} color="#41414d" />
                        Já tenho cadastro
                    </Link>
                </form>
            </div>
        </div>
    );
}