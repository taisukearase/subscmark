import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Bookmark } from '../models'
import { deleteBookmarks } from '../logic/Api'

type Props = {
  isOpen: boolean
  onClose: () => void
  fetchBookmarks: () => Promise<void>
  object?: Bookmark
}

const useStyles = makeStyles({
  leftAlignDialogActions: {
    justifyContent: 'flex-start',
  },
})

const DeleteConfirm: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, onClose, fetchBookmarks, object } = props

  const [isLoading, setIsLoading] = useState(false)

  const deleteItem = async (): Promise<void> => {
    if (!object?.id) {
      return
    }
    await deleteBookmarks(object.id)
  }
  const onDelete = async (): Promise<void> => {
    setIsLoading(true)
    await deleteItem()
    await fetchBookmarks()
    onClose()
    setIsLoading(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">ブックマークの削除</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ブックマークを削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          classes={{ root: classes.leftAlignDialogActions }}>
          キャンセル
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={onDelete} disabled={isLoading} color="secondary" variant="contained">
          {isLoading ? '削除中' : '削除'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteConfirm
