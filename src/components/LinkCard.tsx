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

type ContentProps = {
  title: string
  url: string
  onFormOpen: () => void
}

const LinkCard: React.FC<ContentProps> = props => {
  const classes = useStyles()
  const { url, title, onFormOpen } = props
  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.title}
        onClick={() => {
          window.open(url)
        }}>
        <CardContent>
          <Typography variant='body2' component='h2' gutterBottom noWrap>
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            noWrap>
            {url}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea
        className={classes.editButton}
        onClick={() => {
          onFormOpen()
        }}>
        <EditIcon />
      </CardActionArea>
    </Card>
  )
}

export default LinkCard
