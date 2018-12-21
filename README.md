# React IPPS Provider Client

> Info: More info about the ipps data can be found [here](https://data.cms.gov/Medicare-Inpatient/Inpatient-Prospective-Payment-System-IPPS-Provider/97k6-zzx3)

This is an example of a decoupled frontend app implemented with `React`, fetching data from a `Express` rest api backend.

This app provides a simple authentication example that only allows registered users to see the contents.

> Info: For the simplicity of this demo anyone can register and there is no 2 factor authentication (e.g. confirm your email)
> 
> Please be aware that for security reasons the database contents (users) are being dumped every couple of hours.

- You can find a [online demo here](https://ipps.now.sh/)
  
## Features

- Auth
  - Public sign up new user
    - User emails are unique
  - Login existing user
  - Logout current user
  - Get user profile

- Provider data
  - Pagination
  - Load up to 30.000 records at once on a single page
  - Real-time sorting of received data by any data column
    - Correct sorting of currency strings
  - Optional global cache for recent requests
  - Preloader

- Mobile optimization for iOS
  - Optimized for standalone mode
    - Almost `native like` experience when added to home screen
  - Optimized for `portrait` and `landscape` modes

- Auto login user if local token exists and is valid

- Error pages

## Configuration

Modify configuration in `.env` (start by renaming `env.example` to `.env`, [wondering why?](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7))

Below the two most important settings to get you started
```bash
# e.g. https://ipps-api.now.sh
API_URL=https://your-api-url.com 
LOCALSTORAGE_TOKEN_NAME=any-string-you-like
```


## :rocket: Getting started

After you have cloned the repository to your computer please run the following commands inside the project folder:

```bash
# install dependencies
yarn

# run the app (localhost:3000)
yarn start
```

## :construction: Test

To make sure the application works as expected you can run the test suite like this:

```bash
# runs all test files
yarn test

# with coverage report
yarn test --coverage

# watch
yarn test --watch

# run tests that match a spec-name (e.g `App` or `components/Form`)
yarn test name-of-spec

# update snapshots that are out of date
yarn test --updateSnapshot
```

> A full list of `jest` cli commands can be found [here](https://jestjs.io/docs/en/cli)

## :rainbow: Prettier

Prettier is a code formatter that ensures that all outputted code conforms to a consistent style

Run the following command before each commit to make sure your changes are valid :nerd_face:

Formats all `Js/Jsx` and `Scss` files according to `prettier.config.js` presets

```bash
# format all files
yarn format
```

## :vertical_traffic_light: Linter

> 
> Code linting can be seen, in a more broad sense, as static code analysis.
> 
> [What's the difference between Lint and Prettier?](https://restishistory.net/blog/whats-the-difference-between-eslint-and-prettier.html)

Lints all `Js/Jsx` and `Scss` files according to `.eslintrc` presets

```bash
# lint all files
yarn lint
```

> **Note:** Before running `yarn lint`, please run `yarn format` first :wink:

## :factory: Build

If you wish to host this app, you will need to run the build command. After you've run the command, you will find the build artefacts in the `/dist` folder.

```bash
# build static files
yarn build
```

## :truck: Deploy to Zeit.co with `now`

If you wish, you can deploy this app to Zeit.co. To do so please configure the following settings before you hit `yarn deploy` 

> Info: It's also possible to host with any other providers (e.g. Heroku) which support `node.js`

1. Modify configuration in `.env` (start by renaming `env.example` to `.env`, [wondering why?](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7))
2. Modify configuration in `now.json` (start by renaming `now.example.json` to `now.json`
3. Make sure you're running on a port which is mentioned inside the `CORS_WHITELIST` of the [backend](https://github.com/eeegor/ipps-api)

> Info: `Zeit.co now` creates deployments with random url names. In order to properly configure `cors` it is recommended to create an `alias` for your domain. 
> 
> It's easy to do with the following command after deployment:
> ```bash
> now alias {the-random-deployment-url} {alias-name}

Finally now you're ready to:
```bash
# deploy app to production
yarn deploy
```
> Info: This will run `format` and `lint` in the `prebuild` step, to make sure the deployed version is meeting the requirements.
>
> If you want to skip this step, you can remove the flag from the `prebuild` in `package.json/scripts`

## Tools, Libraries and Packages

### React

A JavaScript library for building user interfaces

More info [here](https://reactjs.org/)

##### Additional Packages
- [React Dom](https://reactjs.org/docs/react-dom.html)
  - The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. Most of your components should not need to use this module.

### React Virtualized

React components for efficiently rendering large lists and tabular data

More info [here](https://github.com/bvaughn/react-virtualized)

### Query String

Parse and stringify URL query strings

More info [here](https://github.com/sindresorhus/query-string)

### Lodash

Utility functions
JavaScript utility library delivering modularity, performance & extras

More info [here](https://github.com/axios/axios)

### Axios

Promise based HTTP client for the browser and node.js

More info [here](https://lodash.com/)

### Dotenv

Loads environment variables from `.env` file 

More info [here](https://github.com/motdotla/dotenv)

### Node Sass

Node.js bindings to libsass 

More info [here](https://github.com/sass/node-sass)

### Classnames

A simple javascript utility for conditionally joining classNames together

More info [here](https://github.com/JedWatson/classnames)

### Babel, Lint & Prettier

This application follows the [airbnb](https://github.com/airbnb/javascript) coding styleguide conventions for `ECMAScript 2018` setup with [babel](https://github.com/babel/babel) [eslint](https://eslint.org/) and [prettier](https://github.com/prettier/prettier).