import React, { useState, useEffect } from 'react'
import { Close as CloseIcon, Assignment as AssignmentIcon } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  IconButton,
  Typography,
  ClickAwayListener,
  Tooltip,
  Divider,
  Box,
} from '@material-ui/core'
import CopyToClipBoard from 'react-copy-to-clipboard'
import { Alert } from '@material-ui/lab'
import * as storage from '../logic/Storage'

type Props = {
  isOpen: boolean
  onFormClose: () => void
  restoreUser: (userCd: string) => Promise<void>
  loginUser: (isLogout: boolean) => Promise<void>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

const SettingDialog: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, onFormClose, restoreUser, loginUser } = props

  const [currentUserCd, setCurrentUserCd] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isLogouting, setIsLogouting] = useState(false)
  const [inputtedUserCd, setInputedUserCd] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCopiedOpen, setIsCopiedOpen] = useState(false)

  useEffect(() => {
    if (isOpen === true) {
      setCurrentUserCd(storage.getUserCd() || '')
    }
  }, [isOpen])

  const onTooltipClose = (): void => {
    setIsCopiedOpen(false)
  }

  const onClickCopyButton = (): void => {
    setIsCopiedOpen(true)
  }

  const handleClose = (): void => {
    // 入力内容をクリアしてから閉じる
    setInputedUserCd('')
    setErrorMessage('')
    setIsSending(false)
    setIsLogouting(false)
    onFormClose()
  }

  const onSubmit = async (): Promise<void> => {
    setErrorMessage('')
    setIsSending(true)
    try {
      await restoreUser(inputtedUserCd)
      handleClose()
    } catch (err) {
      setErrorMessage('復元するブックマークが存在しませんでした')
      setIsSending(false)
    }
  }

  const onLogout = async (): Promise<void> => {
    setIsLogouting(true)
    try {
      await loginUser(true)
      handleClose()
    } catch (err) {
      handleClose()
    }
  }

  const onChangeInput = (e: React.ChangeEvent<{ value: string }>): void => {
    const { value } = e.target

    setInputedUserCd(value)
  }

  const isInvalid = (): boolean => inputtedUserCd.length !== 16

  const ErrorAlert = (): JSX.Element | null => {
    return !errorMessage ? null : (
      <Box mt={4}>
        <Alert variant="outlined" severity="error">
          {errorMessage}
        </Alert>
      </Box>
    )
  }

  const Border = (): JSX.Element => (
    <Box my={3}>
      <Divider variant="middle" />
    </Box>
  )

  return (
    <div className={classes.root}>
      <Dialog open={isOpen} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            disabled={isLogouting || isSending}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              あなたのブックマークID
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  {currentUserCd}
                </Typography>
              </Grid>
              <Grid item>
                <ClickAwayListener onClickAway={onTooltipClose}>
                  <Tooltip
                    onClose={onTooltipClose}
                    open={isCopiedOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="right"
                    title="Copied">
                    <CopyToClipBoard text={currentUserCd}>
                      <IconButton onClick={onClickCopyButton} disabled={!currentUserCd}>
                        <AssignmentIcon />
                      </IconButton>
                    </CopyToClipBoard>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
            </Grid>
            <Typography variant="caption" color="textSecondary">
              ブラウザの履歴をクリアすると消去されます。
              <br />
              ブックマークIDはいかなる場合でも再発行できません。必ずお控えください。
            </Typography>
          </div>
          <Border />
          <div>
            <Box my={2}>
              <Typography variant="subtitle2" color="textSecondary">
                ブックマークの復元
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">
              ブックマークIDを復元することで以前登録したブックマークが復元します。
              <br />
              また複数端末で共有することもできます。
            </Typography>
            <Box textAlign="center" mt={2}>
              <Grid container alignItems="center" justify="center" spacing={3}>
                <Grid item xs={8}>
                  <TextField
                    margin="dense"
                    id="title"
                    name="title"
                    value={inputtedUserCd}
                    onChange={onChangeInput}
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    disabled={isInvalid() || isSending || isLogouting}
                    onClick={onSubmit}
                    color="primary"
                    variant="contained">
                    {isSending ? '送信中' : '送信'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <ErrorAlert />
          </div>
          <Border />
          <div>
            <Box my={2}>
              <Typography variant="subtitle2" color="textSecondary">
                ブックマークをログアウトする
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">
              ログアウトすることで、新しいブックマークIDが発行されます。
              <br />
              現在のブックマークIDはログアウトした後でも、復元することで再度利用することができます。
            </Typography>
            <Box my={2} textAlign="center">
              <Button
                disabled={isLogouting || isSending}
                onClick={onLogout}
                color="primary"
                variant="contained">
                {isLogouting ? 'ログアウト中' : 'ログアウト'}
              </Button>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={isLogouting || isSending}>
            キャンセル
          </Button>
          <div style={{ flex: '1 0 0' }} />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SettingDialog
