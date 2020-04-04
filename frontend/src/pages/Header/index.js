import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import getUser from '../../services/getUser';

import './styles.scss';

export default function Header(props) {
    const history = useHistory();

    const [userName, setUserName] = useState('');

    useEffect(() => {
        console.log(getUser());
        setUserName(getUser() ? getUser().name : '');
    }, []);



    function handleLogout() {
        localStorage.clear();
        setUserName('');
        history.push('/');
    }

    return (
        <div className="header-container">
            {userName &&
                <header>
                    <span>Olá, {userName}</span>
                    <button className="btnLogout" onClick={handleLogout} type="button">Log out</button>
                </header>
            }
            {props.children}
        </div>
    );
}