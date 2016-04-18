import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

if ( process.env.BROWSER ) {
    require('./App.scss');
}

class App extends Component {
    static propTypes = {
        // injected by react-redux
        context: PropTypes.shape({

        }),
        // injected by react-router
        children: PropTypes.node,
    };

    // https://facebook.github.io/react/docs/context.html
    static childContextTypes = {

    };

    constructor(props) {
        super(props)
    }

    getChildContext() {
        const context = this.props.context;
        return {

        };
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="wrapper">
                <Helmet
                    title="Mulletude"
                    meta={[
                        { "name": "description", "content": "Mulletude boilerplate" },
                        { "property": "og:type", "content": "article" },
                        { "property": "og:description", "content": "React + Hapi boilerplate for isomorphic/universal web apps" },
                    ]} />
                <Header />
                <main className="content">
                    { this.props.children }
                </main>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        context: state.context,
    }
}

export default connect(mapStateToProps, {})(App);
