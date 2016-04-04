import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

function Header() {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <Link to="/"><h1 className={s.logo} title="Mulletude">Mulletude</h1></Link>
                <nav className={s.navbarRight}>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </div>
    );
}

export default withStyles(Header, s);
