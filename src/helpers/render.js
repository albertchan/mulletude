import React from "react";
import { renderToString } from 'react-dom/server';
import { I18nextProvider, loadNamespaces } from 'react-i18next';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import i18n from './i18n-server';
import configureStore from '../store/configureStore';
import Html from '../containers/Html';
import routes from '../routes';

export default function(request, reply) {
    const locale = 'en-US';
    const resources = i18n.getResourceBundle(locale, 'common');
    const i18nClient = { locale, resources };
    const i18nServer = i18n.cloneInstance();

    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    match({ routes, location: { pathname: request.path } }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            reply.redirect(redirectLocation.pathname + redirectLocation.search).code(301);
        } else if (error) {
            reply(error.message).code(500);
        } else if (renderProps) {
            loadNamespaces({ ...renderProps, i18n: i18nServer }).then(() => {
                const context = {};

                // Compile an initial state
                const initialState = {
                    context: context,
                };

                // Create a new Redux store instance
                const store = configureStore(initialState);

                // Render the component to a string
                const component = (
                    <I18nextProvider i18n={ i18nServer }>
                        <Provider store={ store }>
                            <RouterContext { ...renderProps } />
                        </Provider>
                    </I18nextProvider>
                );

                const output = renderToString(
                    <Html assets={ webpackIsomorphicTools.assets() } component={ component } i18n={ i18nClient } store={ store } />
                );

                // Send the rendered page back to the client
                reply('<!doctype html>\n' + output);
            });
        } else {
            reply('Not found').code(404);
        }
    });
}
