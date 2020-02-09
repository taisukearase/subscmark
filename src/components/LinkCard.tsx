import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
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
          <Typography gutterBottom variant='body2' component='h2' noWrap={true}>
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            noWrap={true}>
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
