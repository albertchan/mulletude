Mulletude
=========

A [hapi](http://hapijs.com/) and [React](http://facebook.github.io/react/) boilerplate for building web applications. The philosophy of this bootstrap is epitomized by the [mullet](https://en.wikipedia.org/wiki/Mullet_(haircut)) hairstyle—snappy up front, snazzy in the back.

Prior art and inspirations include the following:

* [The Mullet Stack](https://github.com/lynnaloo/mullet)
* [hapi-react-starter-kit](https://github.com/Dindaleon/hapi-react-starter-kit)
* [React Starter Kit](https://github.com/kriasoft/react-starter-kit)

#### Features

Mulletude, as the name implies, has attitude and is very opinionated. The opinion is that a boilerplate should only include the essentials for you to start rocking, just like old-time hockey. Decisions such as what database or API framework to use, or whether to wear a helmet or not, is entirely up to you.

* [Hapi](http://hapijs.com/) server framework for Node.js
* [React.js](http://facebook.github.io/react/) for view system
* [React-router](https://github.com/reactjs/react-router) to keep UI in sync with the URL
* [Redux](https://github.com/reactjs/redux) for predictable state container
* [i18next](https://github.com/kenkouot/hapi-i18next) for internationalization
* [Webpack](http://webpack.github.io/)
* Linting with eslint
* ES6 and ES7 ready with Babel

#### Project structure

```
.
├── build/                  # Folder for compiled output
├── node_modules/           # 3rd party libraries
├── src/                    # The source of the application
│   ├── actions/            # Action creators to trigger a dispatch to stores
│   ├── components/         # React components
│   ├── containers/         # Higher-order React components
│   ├── handlers/           # Render handlers
│   ├── reducers/           # Redux reducers
│   ├── routes/             # Page components along with routing information
│   ├── store/              # Application state and logic
│   ├── styles/             # Common stylesheets
│   ├── views/              # Server-side rendered templates
│   ├── client.js           # Client-side startup script
│   ├── config.js           # App config
│   └── server.js           # Server-side startup script   
├── tools/                  # Build automation scripts
└── package.json            # List of dependencies and 3rd party libraries
```

#### Installation and build automation tools

Clone the repository and install:

```
git clone https://github.com/albertchan/mulletude.git
npm install
```

##### `npm start`

* Cleans up the output `/build` directory
* Copies static files to the output folder
* Launches [Webpack](https://webpack.github.io/) compiler in a watch mode via [webpack-middleware](https://github.com/kriasoft/webpack-middleware)
* Launches a [Hapi](http://hapijs.com/) server from the compiled output folder
* Launches [BrowserSync](https://browsersync.io/)

To bundle the assets for production or deployment:

```
npm run build
```

#### Todos

[ ] Testing
[ ] Provide example Redux actions
[ ] Internationalization (i18n)
