import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';

if ( process.env.BROWSER ) {
    require('./Footer.scss');
}

function Footer(props) {
    const { t } = props;

    return (
        <div className="footer">
            <div className="container">
                <div className="copyright">{ t('footer.copyright') }</div>
            </div>
        </div>
    );
}


export default translate(['common'])(Footer);
