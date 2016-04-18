import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { translate } from 'react-i18next';

if ( process.env.BROWSER ) {
    require('./Header.scss');
}

function Header(props) {
    const { t } = props;

    return (
        <div className="header">
            <div className="container">
                <Link to="/"><h1 className="logo" title="Mulletude">Mulletude</h1></Link>
                <nav className="navbar-right">
                    <Link to="/about">{ t('nav.about') }</Link>
                </nav>
            </div>
        </div>
    );
}


export default translate(['common'])(Header);
