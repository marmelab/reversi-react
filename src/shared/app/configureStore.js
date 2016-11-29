import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';

const logger = createLogger();
const store = applyMiddleware(logger)(createStore)(rootReducer);

export default () => store;
