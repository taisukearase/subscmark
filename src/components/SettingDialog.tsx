import React, { useState, useEffect, useMemo } from 'react'
import { Close as CloseIcon, Assignment as AssignmentIcon } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  IconButton,
  Chip,
  Input,
  Typography,
  ClickAwayListener,
  Tooltip,
  Divider,
} from '@material-ui/core'
import CopyToClipBoard from 'react-copy-to-clipboard'
import * as storage from '../logic/Storage'
import { putUser } from '../logic/Api'

type Props = {
  isOpen: boolean
  onFormClose: () => void
  restoreUser: (userCd: string) => Promise<void>
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
  formControl: {
    fullWidth: true,
    display: 'flex',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  divider: {
    margin: theme.spacing(3),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
}))

const SettingDialog: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, onFormClose, restoreUser } = props

  const [isLoading, setIsLoading] = useState(false)
  const [inputtedUserCd, setInputedUserCd] = useState('')
  const [isCopiedOpen, setIsCopiedOpen] = React.useState(false)

  const userCd = storage.getUserCd() || ''

  const onTooltipClose = (): void => {
    setIsCopiedOpen(false)
  }

  const onClickCopyButton = (): void => {
    setIsCopiedOpen(true)
  }

  const handleClose = (): void => {
    // 入力内容をクリアしてから閉じる
    setInputedUserCd('')
    setIsLoading(false)
    onFormClose()
  }

  const onSubmit = async (): Promise<void> => {
    setIsLoading(true)
    await restoreUser(inputtedUserCd)
    handleClose()
  }

  const onChangeInput = (e: React.ChangeEvent<{ value: string }>): void => {
    const { value } = e.target

    setInputedUserCd(value)
  }

  const isInvalid = (): boolean => inputtedUserCd === ''

  return (
    <div className={classes.root}>
      <Dialog open={isOpen} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
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
                  {userCd}
                </Typography>
              </Grid>
              <Grid item>
                <ClickAwayListener onClickAway={onTooltipClose}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={onTooltipClose}
                    open={isCopiedOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied">
                    <CopyToClipBoard text={userCd}>
                      <IconButton onClick={onClickCopyButton} disabled={!userCd}>
                        <AssignmentIcon />
                      </IconButton>
                    </CopyToClipBoard>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
            </Grid>
            <Typography variant="caption" color="textSecondary">
              ※ブラウザの履歴をクリアすると消去されます。ブックマークIDはいかなる場合でも再発行できません。必ずお控えください。
            </Typography>
          </div>
          <Divider variant="middle" className={classes.divider} />
          <div>
            <Typography variant="subtitle2" color="textSecondary" className={classes.mb2}>
              ブックマークの復元
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ブックマークIDを復元することで以前登録したブックマークが復元します。また複数端末で共有することもできます。
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              value={inputtedUserCd}
              onChange={onChangeInput}
              type="text"
              fullWidth
            />
            <Button
              disabled={isInvalid() || isLoading}
              onClick={onSubmit}
              color="primary"
              variant="contained">
              {isLoading ? '送信中' : '送信'}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            キャンセル
          </Button>
          <div style={{ flex: '1 0 0' }} />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SettingDialog
