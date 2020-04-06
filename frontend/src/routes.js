import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Landing from './pages/Landing';
import Protocol from './pages/Protocol';

import { getLoggedUser } from './services/managerUser';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <PrivateRoute>
                    <Route path="/cart" component={Cart}></Route>
                    <Route path="/protocol" component={Protocol}></Route>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}

function PrivateRoute({ children, ...props }) {
    return (
        <Route
            {...props}
            render={({ location }) => {
                if (getLoggedUser()) {
                    return children;
                }

                return <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            }}
        />
    );
}