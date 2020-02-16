import React, { useState, useMemo } from 'react'
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

import { isRead } from '../logic/Date'
import { format } from 'date-fns'

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
  date?: number[]
  lastReadDay?: string
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // object のプロパティの変更を感知できない？ので代用
  const [date, setDate] = useState(object.lastReadDay)

  const handleLinkClick = () => {
    setDate(format(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    ))
    window.open(object.url)
  }

  const alert: string = useMemo(() => {
    return isRead(date, object.type, object.date) ? '既読' : '未読'
  }, [date, object.date, object.type])

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.title}
        onClick={handleLinkClick}>
        <CardContent>
          <Typography variant='body2' component='h2' gutterBottom noWrap>
            {alert}
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
      <CardActionArea className={classes.editButton} onClick={handleMenuClick}>
        <MoreVertIcon />
      </CardActionArea>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 'auto'
          }
        }}>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onFormOpen(object)
          }}>
          <EditIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            onDeleteConfirmOpen(object)
          }}>
          <DeleteIcon />
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default LinkCard
