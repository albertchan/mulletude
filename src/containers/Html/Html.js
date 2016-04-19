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
        assets: PropTypes.object,
    };

    rawMarkup(markup) {
        return {
            __html: markup
        };
    }

    devStyles(styles) {
        const App = styles['./containers/App/App.scss']._style;
        const Header = styles['./components/Header/Header.scss']._style;
        const Footer = styles['./components/Footer/Footer.scss']._style;
        const Home = styles['./containers/Home/Home.scss']._style;

        return {
            __html: App + Header + Footer + Home
        };
    }

    serializedI18n(i18n) {
        return {
            __html: `window.__I18N__=${ serialize(i18n) };`
        };
    }

    render() {
        const { assets, component, i18n, store } = this.props;
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
                    {/* (Present only in production with webpack extract text plugin) */}
                    { Object.keys(assets.styles).map((style, key) =>
                        <link key={ key }
                              href={ assets.styles[style] }
                              media="screen, projection"
                              rel="stylesheet"
                              type="text/css"
                              charSet="utf-8" />
                    ) }

                    {/* (Present only in development mode) */}
                    {/* Outputs a <style/> tag with all base styles + App.scss. */}
                    {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
                    {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
                    { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={ this.devStyles(assets.assets) } /> : null }
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
