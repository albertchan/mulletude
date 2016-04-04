import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

function Footer() {
    return (
        <div className={s.footer}>
            Footer
        </div>
    );
}

export default withStyles(Footer, s);
