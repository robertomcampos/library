import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);