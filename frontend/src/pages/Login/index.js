import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.scss';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        api.post('authenticate', {
            email,
            password,
        }).then(result => {
            console.log(result);
            localStorage.setItem('loggedUser', JSON.stringify(result.data));
            history.push('/cart');
        }).catch(e => { console.log(e) });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#3D94F6" />
                        Criar nova conta
                    </Link>
                </form>
            </section>
        </div >
    );
}