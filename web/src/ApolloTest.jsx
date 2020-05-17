import React from 'react'
import { useQuery, gql } from '@apollo/client'

const DEFAULT_DECKS = gql`
  query {
    defaultDecks {
      cards {
        name
        cost
      }
    }
  }
`

export default function DefaultDecks() {
  const { loading, error, data } = useQuery(DEFAULT_DECKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.defaultDecks.map(({id, cards}) => (
    <div key={id}>
      <p>
       Deck: {id}
      </p>
      <div>
        {cards.map(({id, name, cost}) => (<div key={id}>{name} : {cost}</div>))}
      </div>
    </div>
  ))
}