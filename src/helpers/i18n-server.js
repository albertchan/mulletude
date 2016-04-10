import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';

i18n
    .use(Backend)
    .init({
        // for options see http://i18next.com/docs/options/
        whitelist: ['en-US', 'zh-HK'],

        fallbackLng: 'en-US',

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        // Backend
        backend: {
            loadPath: 'src/locales/{{lng}}/{{ns}}.json',
        },

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        debug: false,
    });

export default i18n;
