import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const logger = createLogger();
const store = applyMiddleware(logger)(createStore)(() => {});

export default () => store;
