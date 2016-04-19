import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

if ( process.env.BROWSER ) {
    require('./About.scss');
}

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="about">
                <Helmet title="About" />
                <div className="container">
                    <p className="lead">
                        This project is made with <span className="red">♥</span> by Albert Chan in old-time Hong Kong.
                    </p>
                </div>
            </section>
        );
    }
}

export default About;

