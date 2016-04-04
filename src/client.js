// import 'babel-polyfill';
import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';

// const initialState = window.__INITIAL_STATE__ || {};
const context = {
    insertCss: styles => styles._insertCss(),
};

const run = () => {
    const initialState = Object.assign({}, {
        context,
    });
    const store = configureStore(initialState);

    ReactDOM.render(
        <Provider store={ store }>
            <Router history={ browserHistory } routes={ routes } />
        </Provider>,
        document.getElementById('app')
    );
};

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run, false);
}

