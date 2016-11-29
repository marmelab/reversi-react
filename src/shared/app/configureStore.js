import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/root';

const logger = createLogger();
const store = applyMiddleware(logger)(createStore)(RootReducer);

export default () => store;
