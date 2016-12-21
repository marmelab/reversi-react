import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(createLogger(), sagaMiddleware),
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
};
