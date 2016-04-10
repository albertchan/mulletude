// import 'babel-polyfill';
import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './helpers/i18n-client';
import configureStore from './store/configureStore';
import routes from './routes';

// const initialState = window.__INITIAL_STATE__ || {};
const context = {
    insertCss: styles => styles._insertCss(),
};

// translation bundle
i18n.addResourceBundle(window.__I18N__.locale, 'common', window.__I18N__.resources, true);

const run = () => {
    const initialState = Object.assign({}, {
        context,
    });
    const store = configureStore(initialState);

    ReactDOM.render(
        <I18nextProvider i18n={ i18n }>
            <Provider store={ store }>
                <Router history={ browserHistory } routes={ routes } />
            </Provider>
        </I18nextProvider>,
        document.getElementById('app')
    );
};

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run, false);
}

