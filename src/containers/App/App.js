import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import s from './App.scss';

class App extends Component {
    static propTypes = {
        // injected by react-redux
        context: PropTypes.shape({
            insertCss: PropTypes.func,
        }),
        // injected by react-router
        children: PropTypes.node,
    };

    // https://facebook.github.io/react/docs/context.html
    static childContextTypes = {
        insertCss: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props)
    }

    getChildContext() {
        const context = this.props.context;
        return {
            insertCss: context.insertCss
        };
    }

    componentWillMount() {
        const { insertCss } = this.props.context;
        this.removeCss = insertCss(s);
    }

    componentWillUnmount() {
        this.removeCss();
    }

    render() {
        return (
            <div className={s.wrapper}>
                <Helmet
                    title="Mulletude"
                    meta={[
                        { "name": "description", "content": "Mulletude boilerplate" },
                        { "property": "og:type", "content": "article" },
                        { "property": "og:description", "content": "React + Hapi boilerplate for isomorphic/universal web apps" },
                    ]} />
                <Header />
                <main className={s.content}>
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
