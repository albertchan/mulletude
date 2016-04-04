import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={s.root}>
                <Helmet title="Home" />
                <div className={s.container}>
                    <p className={s.lead}>
                        <strong>Mulletude</strong> is a boilerplate for building web applications. Like a mullet haircut, this bootstrap is snappy up front, snazzy in the back. It has attitude and is very opinionated. The opinion is that a boilerplate should only include the essentials for you to start rocking, just like old-time hockey. Decisions such as what database or API framework to use, or whether to wear a helmet or not, is entirely up to you.
                    </p>
                </div>
            </section>
        );
    }
}

export default withStyles(Home, s);

