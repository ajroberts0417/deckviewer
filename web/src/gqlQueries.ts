import { gql } from '@apollo/client'

export const DEFAULT_DECKS = gql`
  query DefaultDecks{
    defaultDecks {
      id
      name
      deckcards {
        id
        card {
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
  }`

  export const STARTER_DECKS = gql`
  query StarterDecks{
    starterDecks {
      id
      name
      deckcards {
        id
        card {
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
  }`

export const PLAYER_DECKS = gql`
  query PlayerDecks{
    player{
      decks {
        id
        name
        deckcards {
          id
          card {
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
    }
  }`

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($starterDeckId: Int!){
    createPlayer(starterDeckId: $starterDeckId){
      ok
      deck {
        id
        name
        deckcards {
          id
          card {
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
    }
  }
`