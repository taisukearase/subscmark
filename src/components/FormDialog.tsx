import React, { useState } from 'react'
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

type ContentProps = {
  isOpen: boolean
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
  title: string
  url: string
  type: string
  date: string[]
}

const defaultValue: formData = {
  title: '',
  url: '',
  type: '',
  date: []
}

const FormDialog: React.FC<ContentProps> = props => {
  const classes = useStyles()
  const { isOpen, onFormClose } = props

  const [{ title, url, date, type }, setState] = useState(defaultValue)

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
      ? [
          { id: 1, label: '日', value: 'sun' },
          { id: 2, label: '月', value: 'mon' },
          { id: 3, label: '火', value: 'tue' },
          { id: 4, label: '水', value: 'wed' },
          { id: 5, label: '木', value: 'thu' },
          { id: 6, label: '金', value: 'fri' },
          { id: 7, label: '土', value: 'sat' }
        ]
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
        <InputLabel id='date_label'>{type === 'week' ? '曜日' : '日付'}</InputLabel>
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
      <Dialog
        open={isOpen}
        fullWidth
        aria-labelledby='form-dialog-title'>
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
            onChange={onChange}
            type='text'
            fullWidth
          />
          <TextField
            margin='dense'
            id='url'
            name='url'
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
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
