import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

interface BookMark {
  id: number
  title: string
  url: string
  type: string
  date?: string[] | number[] | string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  object?: BookMark
}

const useStyles = makeStyles(theme => ({
  leftAlignDialogActions: {
    justifyContent: 'flex-start'
  }
}))

const DeleteConfirm: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, onClose, object } = props
  const onDelete = () => {
    // TODO 削除して再描画
    console.log(object)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>ブックマークの削除</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          ブックマークを削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color='primary'
          classes={{ root: classes.leftAlignDialogActions }}>
          キャンセル
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={onDelete} color='secondary' variant='contained'>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteConfirm
