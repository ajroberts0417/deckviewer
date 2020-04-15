A deckviewer for a deckbuilding roleplaying game.

Hosted at [sadcp.xyz](https://sadcp.xyz)

## Quickstart
If you want to run the project locally, simply clone the repo then run:

`yarn install && yarn develop`

then navigate to [http://localhost:3000](http://localhost:3000)

## Contributing

This project requires the following software to be installed for development:
- [Node & npm](https://nodejs.org/en/)

1. Fork the repo
Simply press that [fork button](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) in the top right.

2. Clone your forked version locally
`git clone git@github.com:<YOUR_USER_NAME>/deckviewer.git`

3. Navigate into your new project directory
`cd deckviewer`

4. Add the source repository as a remote
`git remote add upstream git@github.com:ajroberts0417/deckviewer.git`

4. Verify your remotes
(Should look something like this)
```bash
$ git remote -v
> origin    https://github.com/YOUR_USERNAME/parkbot.git (fetch)
> origin    https://github.com/YOUR_USERNAME/parkbot.git (push)
> upstream  https://github.com/ajroberts0417/parkbot.git (fetch)
> upstream  https://github.com/ajroberts0417/parkbot.git (push)
```

To update your fork's master branch from the upstream repo, simply use:
```bash
$ git checkout master
$ git pull upstream master
```

## Available Scripts

In the project directory, you can run:

### `yarn develop`

Uses Netlify CLI to run the app + a local proxy server to use [Netlify Functions](https://docs.netlify.com/functions/overview/).
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

The proxy server usually runs at localhost:8888

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Useful Reading
[Netlify Dev](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md) is tremendously useful,especially read up on using it to test [Netlify Functions](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#netlify-functions)