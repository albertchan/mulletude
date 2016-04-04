import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        component: PropTypes.node,
        store: PropTypes.object,
        styles: PropTypes.array,
    };

    rawMarkup(markup) {
        return {
            __html: markup
        };
    }

    render() {
        const { component, store, styles } = this.props;
        let componentHTML = '';
        let head          = '';
        let meta          = '';
        let script        = '';
        let title         = '';

        if (typeof component !== undefined) {
            componentHTML = renderToString(component);
            head = Helmet.rewind(); // see https://github.com/nfl/react-helmet

            title  = head.title.toComponent();
            meta   = head.meta.toComponent();
            script = head.script.toComponent();
        }

        return (
            <html>
                <head>
                    { title }
                    { meta }
                    { script }
                    <link type='text/css' href='https://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic,300italic,300,100italic,100,500,500italic' rel='stylesheet' />
                    <style type="text/css">{ styles.join('') }</style>
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={ this.rawMarkup(componentHTML) } />
                    <script src="/js/bundle.js"></script>
                </body>
            </html>
        );
    }
}
