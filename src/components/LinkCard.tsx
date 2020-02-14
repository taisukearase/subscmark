import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'

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

type Props = {
  object: BookMark
  onFormOpen: (object: BookMark) => void
  onDeleteConfirmOpen: (object: BookMark) => void
}

const LinkCard: React.FC<Props> = props => {
  const classes = useStyles()
  const { object, onFormOpen, onDeleteConfirmOpen } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
      <CardActionArea className={classes.editButton} onClick={handleClick}>
        <MoreVertIcon />
      </CardActionArea>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 'auto'
          }
        }}>
        <MenuItem
          onClick={() => {
            handleClose()
            onFormOpen(object)
          }}>
          <EditIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            onDeleteConfirmOpen(object)
          }}>
          <DeleteIcon />
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default LinkCard
