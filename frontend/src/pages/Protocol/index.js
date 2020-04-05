import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import moment from 'moment';

import './styles.scss';

export default function Protocol() {

    const [reservation] = useState(useLocation().state);

    return (
        <div className="protocol-container">
            <section>
                <h1>Sua reserva foi efetuada com sucesso</h1>
                <strong>Data da reserva </strong>{moment(reservation.startsOn).format('DD/MM/YYYY')}
                <strong>Data da entrega </strong>{moment(reservation.endsOn).format('DD/MM/YYYY')}
                <strong>Protocolo </strong>{reservation.protocol.toUpperCase()}
                <Link className="back-link" to="/">
                    <FiLogIn size={16} color="#41414d" />
                        Fazer nova reserva
                    </Link>
            </section>
        </div >
    );
}