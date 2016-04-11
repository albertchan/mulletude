import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

function Footer(props) {
    const { t } = props;

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.copyright}>{ t('footer.copyright') }</div>
            </div>
        </div>
    );
}


export default translate(['common'])(withStyles(Footer, s));
