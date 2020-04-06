import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser } from '../../services/managerUser';
import { createUser, clear } from '../../store/User/actions';

import './styles.scss';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { data: user, hasError, message } = useSelector(state => state.user);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setLoggedUser(user);
            history.push('/cart');
        }
    }, [user]);

    useEffect(() => {
        return () => {
            dispatch(clear());
        }
    }, [])

    useEffect(() => {
        if (hasError) {
            alert(message);
        }
    }, [hasError, message]);

    async function handleRegister(e) {
        e.preventDefault();

        dispatch(createUser({
            name,
            email,
            password,
        }));
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
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="Email" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Senha"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)} />
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