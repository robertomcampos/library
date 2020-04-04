import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { useLocation} from "react-router";
import queryString from 'query-string'


import './styles.scss';

export default function Protocol() {
    const queryProtocol = queryString.parse(useLocation().search).p;
    const [protocol, setProtocol] = useState(queryProtocol);

    return (
        <div className="protocol-container">
            <h1>Sua reserva foi efetuada com sucesso</h1>
            <strong>Protocolo: {protocol}</strong>
            <Link className="back-link" to="/">
                <FiLogIn size={16} color="#3D94F6" />
                        Fazer nova reserva
                    </Link>
        </div >
    );
}