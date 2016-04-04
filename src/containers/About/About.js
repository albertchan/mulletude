import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.scss';

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={s.root}>
                <Helmet title="About" />
                <div className={s.container}>
                    <p className={s.lead}>
                        This project is made with <span className={s.red}>♥</span> by Albert Chan in old-time Hong Kong.
                    </p>
                </div>
            </section>
        );
    }
}

export default withStyles(About, s);

