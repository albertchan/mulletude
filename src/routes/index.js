import React from 'react';
import { Route, IndexRoute } from 'react-router';
import About from '../containers/About';
import App from '../containers/App';
import Home from '../containers/Home';

/**
 * The React routes for both the server and the client.
 */
export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="about" component={ About } />
    </Route>
)
