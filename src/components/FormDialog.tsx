import React, { useState, useEffect } from 'react'
import { Close as CloseIcon } from '@material-ui/icons'
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
} from '@material-ui/core'
import { Bookmark, FormData } from '../models'
import { putBookmarks, postBookmarks } from '../logic/Api'

type Props = {
  isOpen: boolean
  object?: Bookmark
  onFormClose: () => void
  loginUser: () => Promise<void>
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
}))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const defaultValue: FormData = {
  title: '',
  url: '',
  type: '',
  date: [],
}

const FormDialog: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, object, onFormClose, loginUser } = props

  const [formData, setFormData] = useState(defaultValue)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!object) {
      // object を初期化した際に入力値も初期化する
      clearState()
      return
    }
    const { id, title, url, type, date } = object
    setFormData({ id, title, url, type, date })
  }, [object])

  const onChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const { value } = e.target
    const name = e.target.name as string

    if (name === 'type' && value !== formData.type) {
      setFormData(prevState => ({ ...prevState, date: [] }))
    }
    if (name === 'date' && Array.isArray(value)) {
      setFormData(prevState => ({ ...prevState, date: value.sort((a, b) => a - b) }))
      return
    }
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const isInvalid = (): boolean => {
    const { title, type, date } = formData
    return (
      title === '' ||
      !isValidUrl ||
      (['week', 'month'].indexOf(type) !== -1 ? (date?.length ?? 0) < 1 : type !== 'day')
    )
  }

  const isValidUrl = formData.url.startsWith('http://') || formData.url.startsWith('https://')

  const clearState = (): void => {
    setFormData({ ...defaultValue })
  }

  const handleClose = (): void => {
    // 入力内容をクリアしてから閉じる
    clearState()
    setIsLoading(false)
    onFormClose()
  }

  const onSubmit = async (): Promise<void> => {
    setIsLoading(true)
    if (formData.id) {
      await putBookmarks(formData)
    } else {
      await postBookmarks(formData)
    }
    await loginUser()
    handleClose()
  }

  interface DateItem {
    id: number
    label: string | number
    value: string | number
  }

  const dateItems: DateItem[] =
    formData.type === 'week'
      ? ['日', '月', '火', '水', '木', '金', '土'].map((label, i) => ({
          id: i + 1,
          label,
          value: i,
        }))
      : [...Array(31)].map((_, i) => ({
          id: i + 1,
          label: i + 1,
          value: i + 1,
        }))

  const DateSelector = (): JSX.Element | null => {
    if (formData.type !== 'week' && formData.type !== 'month') {
      return null
    }
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="date_label">{formData.type === 'week' ? '曜日' : '日付'}</InputLabel>
        <Select
          labelId="date_label"
          id="date"
          multiple
          value={formData.date}
          name="date"
          onChange={onChange}
          input={<Input id="select-multi-chip" />}
          renderValue={(selected): JSX.Element => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => {
                const selectedItem = dateItems.find(item => item.value === value)
                return <Chip key={value} label={selectedItem?.label} className={classes.chip} />
              })}
            </div>
          )}
          MenuProps={MenuProps}>
          {dateItems.map(item => (
            <MenuItem value={item.value} key={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <div className={classes.root}>
      <Dialog open={isOpen} fullWidth aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="タイトル"
            value={formData.title}
            onChange={onChange}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="url"
            name="url"
            value={formData.url}
            label="URL"
            type="text"
            placeholder="http:// または https://"
            onChange={onChange}
            fullWidth
          />
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="type_label">タイプ</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={onChange}
                  autoWidth>
                  <MenuItem value="day">毎日</MenuItem>
                  <MenuItem value="week">毎週</MenuItem>
                  <MenuItem value="month">毎月</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <DateSelector />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            キャンセル
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button
            disabled={isInvalid() || isLoading}
            onClick={onSubmit}
            color="primary"
            variant="contained">
            {isLoading ? '送信中' : '送信'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
