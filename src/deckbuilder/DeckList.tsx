import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

interface Props {
    deck: any;  //TODO change type when apollo migration happens
}

const DeckList: React.FC<Props> = ({deck}) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {Object.keys(deck).map((cardId) => (
            <TableRow key={cardId}>
              <TableCell component="th" scope="row">
                {deck[cardId].count}
              </TableCell>
              <TableCell>{deck[cardId].cardName}</TableCell>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DeckList
