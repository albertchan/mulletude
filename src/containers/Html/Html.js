import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

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
        i18n: PropTypes.object,
        store: PropTypes.object,
        styles: PropTypes.array,
    };

    rawMarkup(markup) {
        return {
            __html: markup
        };
    }

    serializedI18n(i18n) {
        return {
            __html: `window.__I18N__=${ serialize(i18n) };`
        };
    }

    render() {
        const { component, i18n, store, styles } = this.props;
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
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic,300italic,300,100italic,100,500,500italic' rel='stylesheet" />
                    <style type="text/css">{ styles.join('') }</style>
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={ this.rawMarkup(componentHTML) } />
                    <script dangerouslySetInnerHTML={ this.serializedI18n(i18n) } charSet="utf-8" />
                    <script src="/js/bundle.js" charSet="utf-8" />
                </body>
            </html>
        );
    }
}
