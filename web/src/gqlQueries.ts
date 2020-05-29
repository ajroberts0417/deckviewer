import { gql } from '@apollo/client'

export const DEFAULT_DECKS = gql`
  query DefaultDecks{
    defaultDecks {
      id
      name
      player {
        user {
          username
        }
      }
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
  }`

export const PLAYER_DECKS = gql`
  query PlayerDecks{
    player{
      decks {
        id
        name
        player {
          user {
            username
          }
        }
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
  }`