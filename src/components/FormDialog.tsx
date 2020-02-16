import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
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
  Input
} from '@material-ui/core'

interface BookMark {
  id: number
  title: string
  url: string
  type: string
  date?: number[]
  lastReadDay?: string
}

type Props = {
  isOpen: boolean
  object?: BookMark
  onFormClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  formControl: {
    fullWidth: true,
    display: 'flex'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface formData {
  id?: number | null
  title: string
  url: string
  type: string
  date?: number[]
}

const defaultValue: formData = {
  title: '',
  url: '',
  type: '',
  date: []
}

const FormDialog: React.FC<Props> = props => {
  const classes = useStyles()
  const { isOpen, object, onFormClose } = props

  const [{ title, url, date, type }, setState] = useState(defaultValue)

  useEffect(() => {
    setState(() => ({
      title: object?.title ?? '',
      url: object?.url ?? '',
      type: object?.type ?? '',
      date: object?.date ?? []
    }))
  }, [object])

  const onChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { value } = e.target
    const name = e.target.name as string

    if (name === 'type' && value !== type) {
      setState(prevState => ({ ...prevState, date: [] }))
    }
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const onSubmit = () => {
    // TODO POST or PUT
    console.log({
      title,
      url,
      type,
      date
    })
    handleClose()
  }

  const clearState = () => {
    setState({ ...defaultValue })
  }

  const handleClose = () => {
    // 入力内容をクリアしてから閉じる
    clearState()
    onFormClose()
  }

  interface dateItem {
    id: number
    label: string | number
    value: string | number
  }

  const dateItems: dateItem[] =
    type === 'week'
      ? ['日', '月', '火', '水', '木', '金', '土'].map((label, i) => ({
        id: i + 1,
        label,
        value: i
      }))
      : [...Array(31)].map((_, i) => ({
          id: i + 1,
          label: i + 1,
          value: i + 1
        }))

  const DateSelector = () => {
    if (type !== 'week' && type !== 'month') {
      return null
    }
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id='date_label'>
          {type === 'week' ? '曜日' : '日付'}
        </InputLabel>
        <Select
          labelId='date_label'
          id='date'
          multiple
          value={date}
          name='date'
          onChange={onChange}
          input={<Input id='select-multi-chip' />}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => {
                const item = dateItems.find(item => item.value === value)
                return (
                  <Chip
                    key={value}
                    label={item?.label}
                    className={classes.chip}
                  />
                )
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
      <Dialog open={isOpen} fullWidth aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            name='title'
            label='タイトル'
            value={title}
            onChange={onChange}
            type='text'
            fullWidth
          />
          <TextField
            margin='dense'
            id='url'
            name='url'
            value={url}
            label='URL'
            type='text'
            onChange={onChange}
            fullWidth
          />
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id='type_label'>タイプ</InputLabel>
                <Select
                  labelId='type'
                  id='type'
                  name='type'
                  value={type}
                  onChange={onChange}
                  autoWidth>
                  <MenuItem value='day'>毎日</MenuItem>
                  <MenuItem value='week'>毎週</MenuItem>
                  <MenuItem value='month'>毎月</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <DateSelector />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            キャンセル
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button onClick={onSubmit} color='primary' variant='contained'>
            送信
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
