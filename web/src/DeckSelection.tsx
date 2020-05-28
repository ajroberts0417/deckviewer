import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {useQuery} from '@apollo/client'

import { DEFAULT_DECKS, PLAYER_DECKS } from './gqlQueries'
import { DefaultDecks, DefaultDecks_defaultDecks } from './__generated__/DefaultDecks'

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: '2.5em',
    padding: '0 30px',
    marginRight: '1.5em',
  },
})

interface DeckSelectionProps {
  useDemo?: boolean;
  setDeck: (deck: DefaultDecks_defaultDecks) => void;
}

const DeckSelection: React.FC<DeckSelectionProps> = ({setDeck, useDemo = false}) => {
  const classes = useStyles()

  const deckQuery = useDemo ? DEFAULT_DECKS : PLAYER_DECKS

  const { loading, error, data } = useQuery<DefaultDecks>(deckQuery)
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const decks = useDemo ? data?.defaultDecks : data?.player?.decks

  return (
    <div className="deck-choice">
      {data?.defaultDecks?.map((deck) =>
        <Button classes={{ root: classes.button }} size="small" color="primary" onClick={(): void => {if(deck) setDeck(deck)}}>
          {deck?.name}
        </Button>
      )}
    </div>
  )
}

export default DeckSelection