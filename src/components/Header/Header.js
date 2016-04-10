import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { translate } from 'react-i18next';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

function Header(props) {
    const { t } = props;

    return (
        <div className={s.root}>
            <div className={s.container}>
                <Link to="/"><h1 className={s.logo} title="Mulletude">Mulletude</h1></Link>
                <nav className={s.navbarRight}>
                    <Link to="/about">{ t('nav.about') }</Link>
                </nav>
            </div>
        </div>
    );
}


export default translate(['common'])(withStyles(Header, s));
