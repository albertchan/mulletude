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
* [React](http://facebook.github.io/react/) for view system
* [react-router](https://github.com/reactjs/react-router) to keep UI in sync with the URL
* [Redux](https://github.com/reactjs/redux) for predictable state container
* [i18next](https://github.com/i18next/i18next) for internationalization
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information
* [Webpack](http://webpack.github.io/)
* [mocha](https://mochajs.org/) for unit testing
* [ESLint](http://eslint.org/) to maintain a consistent coding style
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
│   ├── helpers/            # Helpers and handlers
│   ├── locales/            # Translation files
│   ├── middleware/         # Redux middleware
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
npm run build -- --release
```

#### Todos

* [ ] Testing
* [ ] Provide example Redux actions
* [x] Internationalization (i18n)
* [ ] Implement [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools/)
* [ ] Migrate from `style-loader` to [`ExtractTextPlugin`](https://github.com/webpack/extract-text-webpack-plugin)

#### References

- [Getting Started with Redux (video tutorials)](https://egghead.io/series/getting-started-with-redux)
- [Redux Documentation](http://redux.js.org/index.html)
- [Understanding Webpack HMR](http://andrewhfarmer.com/understanding-hmr/)
