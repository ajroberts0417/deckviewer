import { gql } from '@apollo/client'

export const DEFAULT_DECKS = gql`
  query DefaultDecks{
    defaultDecks {
      id
      name
      cards {
        id
        name
        cardType
        classType
        cost
        range
        rulesText
      }
    }
  }
`