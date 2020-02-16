import React, { useState } from 'react'
import { Container, Typography, Box, Link, Fab } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import NavBar from './components/NavBar'
import FormDialog from './components/FormDialog'
import LinkCard from './components/LinkCard'
import DeleteConfirm from './components/DeleteConfirm'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

interface BookMark {
  id: number
  title: string
  url: string
  type: string
  date?: number[]
  lastReadDay?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function App() {
  const classes = useStyles()
  const [object, setObject] = useState<BookMark | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false)

  const onFormOpen = (object?: BookMark) => {
    setObject(object)
    setIsFormOpen(true)
  }
  const onFormClose = () => {
    setIsFormOpen(false)
  }
  const onDeleteConfirmOpen = (object?: BookMark) => {
    setObject(object)
    setIsDeleteConfirmOpen(true)
  }
  const onDeleteConfirmClose = () => {
    setIsDeleteConfirmOpen(false)
  }

  const data: BookMark[] = [
    {
      id: 1,
      title: '無印良品',
      url: 'https://www.muji.com/jp/ja/store',
      type: 'day',
      lastReadDay: '2020-02-14 00:00'
    },
    {
      id: 2,
      title: 'ユニクロ',
      url: 'https://www.uniqlo.com/jp/',
      type: 'week',
      date: [2],
      lastReadDay: '2020-01-10 00:00'
    },
    {
      id: 3,
      title:
        'テストおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお',
      url:
        'https://github.com/poipoisaurus/subscmark?hogehogehogehogehogehogehogehoge',
      type: 'month',
      date: [1, 2, 14, 17],
      lastReadDay: '2020-02-10 00:00'
    }
  ]

  const list = data.map(data => (
    <Box mb={4} key={data.id}>
      <LinkCard
        object={data}
        key={data.id}
        onFormOpen={onFormOpen}
        onDeleteConfirmOpen={onDeleteConfirmOpen}
      />
    </Box>
  ))

  return (
    <React.Fragment>
      <NavBar />
      <Container maxWidth='sm'>
        <Box my={4}>
          {list}
          <Copyright />
        </Box>
      </Container>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={() => {
          onFormOpen()
        }}>
        <AddIcon />
      </Fab>
      <FormDialog
        isOpen={isFormOpen}
        onFormClose={onFormClose}
        object={object}
      />
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        object={object}
      />
    </React.Fragment>
  )
}
