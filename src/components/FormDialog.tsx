import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, Theme } from '@material-ui/core/styles'

type ContentProps = {
  isOpen: boolean
  onFormClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))

const FormDialog: React.FC<ContentProps> = props => {
  const classes = useStyles()
  const { isOpen, onFormClose } = props

  return (
    <div>
      <Dialog
        open={isOpen}
        fullWidth={true}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onFormClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='タイトル'
            type='text'
            fullWidth
          />
          <TextField
            margin='dense'
            id='name'
            label='URL'
            type='text'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={onFormClose} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
