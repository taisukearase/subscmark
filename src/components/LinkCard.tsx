import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'

import { format } from 'date-fns'
import { Bookmark } from '../models'
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

  const [isRead, setIsRead] = useState<boolean | undefined>(object.isRead)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const putReadTime = async (readTime: string): Promise<void> => {
    await putBookmarksReadTime({
      id: object.id,
      lastReadTime: readTime,
    })
  }

  const handleLinkClick = (): void => {
    const readTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    setIsRead(true)
    putReadTime(readTime)
    window.open(object.url)
  }

  const replacedUrl: string = object?.url?.replace(/(http(s?):\/\/)/, '')

  return (
    <Card className={classes.card} style={isRead ? { opacity: 0.3 } : {}}>
      <CardActionArea className={classes.title} onClick={handleLinkClick}>
        <CardContent>
          <Typography variant="body2" component="h2" gutterBottom noWrap>
            {object.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {replacedUrl}
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
