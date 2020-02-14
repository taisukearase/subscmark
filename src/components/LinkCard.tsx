import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
  card: {
    display: 'flex'
  },
  title: {
    maxWidth: '90%'
  },
  editButton: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center'
  }
})

interface BookMark {
  id: number
  title: string
  url: string
  type: string
  date?: string[] | number[] | string
}

type ContentProps = {
  object: BookMark
  onFormOpen: (object: BookMark) => void
}

const LinkCard: React.FC<ContentProps> = props => {
  const classes = useStyles()
  const { object, onFormOpen } = props
  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.title}
        onClick={() => {
          window.open(object.url)
        }}>
        <CardContent>
          <Typography variant='body2' component='h2' gutterBottom noWrap>
            {object.title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            noWrap>
            {object.url}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea
        className={classes.editButton}
        onClick={() => { onFormOpen(object) }}>
        <EditIcon />
      </CardActionArea>
    </Card>
  )
}

export default LinkCard
