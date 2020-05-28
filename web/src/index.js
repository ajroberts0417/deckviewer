import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { onError } from '@apollo/link-error'
import { BrowserRouter } from 'react-router-dom'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      if(message.includes('Error decoding signature')){localStorage.removeItem('token')}
    })

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  // eslint-disable-next-line no-undef
  uri: process.env.NODE_ENV == 'production' ? 'https://deckviewer.herokuapp.com/graphql' : 'http://localhost:8000/graphql',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(httpLink)),
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>;
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
