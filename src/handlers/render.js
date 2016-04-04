import React from "react";
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import configureStore from '../store/configureStore';
import Html from '../containers/Html';
import routes from '../routes';

export default function(request, reply) {
    match({ routes, location: { pathname: request.path } }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {

            reply.redirect(redirectLocation.pathname + redirectLocation.search).code(301);

        } else if (error) {

            reply(error.message).code(500);

        } else if (renderProps == null) {

            reply('Not found').code(404);

        } else {
            const css = [];
            const context = {
                insertCss: styles => css.push(styles._getCss()),
            };

            // Compile an initial state
            const initialState = {
                context: context,
            };

            // Create a new Redux store instance
            const store = configureStore(initialState);

            // Render the component to a string
            const component = (
                <Provider store={ store }>
                    <RouterContext { ...renderProps } />
                </Provider>
            );

            const output = renderToString(<Html component={ component } store={ store } styles={css} />);

            // Send the rendered page back to the client
            reply('<!doctype html>\n' + output);
        }
    });
}
