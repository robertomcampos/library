import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLoggedUser } from '../../services/managerUser';
import { FiShoppingCart } from 'react-icons/fi'
import { clearLoggedUser } from '../../services/managerUser'

import './styles.scss';

export default function Header(props) {

    const [userName, setUserName] = useState('');

    const { data: storedBooks } = useSelector(state => state.storedBooks);

    const history = useHistory();

    useEffect(() => {
        setUserName(getLoggedUser() ? getLoggedUser().name : '');
    }, []);

    function handleLogout() {
        clearLoggedUser();
        setUserName('');
        history.push('/');
    }

    return (
        <div className="header-container">
            <header>
                <div className="cart">
                    <div className="count">{storedBooks.length ? storedBooks.length : ''}</div>
                    <FiShoppingCart size={16} color="#000" />
                </div>
                {userName &&
                    <div>
                        <span>Olá, {userName}.</span>
                        <button className="btnLogout" onClick={handleLogout} type="button">Sair</button>
                    </div>
                }
            </header>
            {props.children}
        </div>
    );
}