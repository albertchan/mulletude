// change these values to fit your needs

const config = {
    connection: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
    server: {
        protocol: 'http://',
        url: {
            development: 'http://localhost:3000',
            production: 'http://localhost:8080'
        },
        debugMode: {},
        reporter: {
            reporters: [{
                console: [{
                    module: 'good-console',
                    events: {
                        response: '*',
                        log: '*'
                    }
                }, 'stdout']
            }],
        },
    },
};

export default config;
