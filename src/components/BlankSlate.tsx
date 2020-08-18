import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Button, Box } from '@material-ui/core'
import { Bookmarks as BookmarksIcon } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  bookmarksIcon: {
    height: 100,
    width: 100,
  },
  emptyText: {
    fontStyle: 'italic',
  },
}))

type Props = {
  onFormOpen: () => void
}

const BlankSlate: React.FC<Props> = props => {
  const classes = useStyles()
  const { onFormOpen } = props

  return (
    <>
      <Box mt={15} mb={5} alignItems="center" justifyContent="center" display="flex">
        <BookmarksIcon className={classes.bookmarksIcon} color="disabled" />
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.emptyText}>
        No Subscmarks
      </Typography>
      <Box my={4} alignItems="center" justifyContent="center" display="flex">
        <Button onClick={onFormOpen} color="primary" variant="contained">
          ブックマークを登録する
        </Button>
      </Box>
    </>
  )
}

export default BlankSlate
