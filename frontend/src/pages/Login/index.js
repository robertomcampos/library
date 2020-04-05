import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from '../../store/Authentication/actions';

import { setLoggedUser } from '../../services/managerUser';

import './styles.scss';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location] = useState(useLocation());

    const { data: user } = useSelector(state => state.authentication);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            successLogin();
        }
    }, [user]);

    function handleLogin(e) {
        e.preventDefault();

        dispatch(getAuthenticatedUser({
            email,
            password,
        }));
    }

    function successLogin() {
        setLoggedUser(user);
        const redirect = location.state && location.state.from
            && location.state.from.pathname;
        history.push(redirect || '/');
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