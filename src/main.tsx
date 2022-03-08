import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-hooks'

import './index.css'

const searchClient = algoliasearch(
  'latency',
  'a4390aa69f26de2fd0c4209ff113a4f9'
)

const INDEX_NAME = 'autocomplete_twitter_accounts'

ReactDOM.render(
  <React.StrictMode>
    <InstantSearch
      searchClient={searchClient}
      indexName={INDEX_NAME}
      suppressExperimentalWarning
    >
      <App />
    </InstantSearch>
  </React.StrictMode>,
  document.getElementById('root')
)
