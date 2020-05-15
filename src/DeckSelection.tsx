import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

const decks = {
  FIGHTER: 1,
  WIZARD: 2,
  CLERIC: 3,
  RANGER: 4,
}

interface DeckSelectionProps {
  setDeck: (deck: number) => void;
}

const DeckSelection: React.FC<DeckSelectionProps> = ({setDeck}) => {
  const classes = useStyles()

  return (
    <div className="deck-choice">
      <Button classes={{ root: classes.button }} size="small" color="primary" onClick={(): void => setDeck(decks.FIGHTER)}>
        Fighter
      </Button>
      <Button classes={{ root: classes.button }} size="small" color="primary" onClick={(): void => setDeck(decks.WIZARD)}>
        Wizard
      </Button>
      <Button classes={{ root: classes.button }} size="small" color="primary" onClick={(): void => setDeck(decks.RANGER)}>
        Ranger
      </Button>
      <Button classes={{ root: classes.button }} size="small" color="primary" onClick={(): void => setDeck(decks.CLERIC)}>
        Cleric
      </Button>
    </div>
  )
}

export default DeckSelection