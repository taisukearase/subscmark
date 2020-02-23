import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'

import { format } from 'date-fns'
import { Bookmark } from '../models'
import { isRead } from '../logic/Date'
import { putBookmarksReadTime } from '../logic/Api'

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  title: {
    maxWidth: '90%',
  },
  editButton: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
  },
})

type Props = {
  object: Bookmark
  onFormOpen: (object: Bookmark) => void
  onDeleteConfirmOpen: (object: Bookmark) => void
}

const LinkCard: React.FC<Props> = props => {
  const classes = useStyles()
  const { object, onFormOpen, onDeleteConfirmOpen } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  // object のプロパティの変更を感知できない？ので代用
  const [date, setDate] = useState(object.lastReadTime)
  const putReadTime = async (readTime: string): Promise<void> => {
    await putBookmarksReadTime({
      id: object.id,
      lastReadTime: readTime,
    })
  }

  const handleLinkClick = (): void => {
    const readTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    setDate(readTime)
    putReadTime(readTime)
    window.open(object.url)
  }

  const alert: string = useMemo(() => (isRead(date, object.type, object.date) ? '既読' : '未読'), [
    date,
    object.date,
    object.type,
  ])

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.title} onClick={handleLinkClick}>
        <CardContent>
          <Typography variant="body2" component="h2" gutterBottom noWrap>
            {alert}
            {object.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {object.url}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea className={classes.editButton} onClick={handleMenuClick}>
        <MoreVertIcon />
      </CardActionArea>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 'auto',
          },
        }}>
        <MenuItem
          onClick={(): void => {
            handleMenuClose()
            onFormOpen(object)
          }}>
          <EditIcon />
        </MenuItem>
        <MenuItem
          onClick={(): void => {
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
