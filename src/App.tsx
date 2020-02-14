import React, { useState } from 'react'
import { Container, Typography, Box, Link, Fab } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import NavBar from './components/NavBar'
import FormDialog from './components/FormDialog'
import LinkCard from './components/LinkCard'

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

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onFormOpen = () => {
    setOpen(true)
  }

  const onFormClose = () => {
    setOpen(false)
  }
  interface BookMark {
    id: number
    title: string
    url: string
  }

  const data: BookMark[] = [
    {
      id: 1,
      title: '無印良品',
      url: 'https://www.muji.com/jp/ja/store'
    },
    {
      id: 2,
      title: 'ユニクロ',
      url: 'https://www.uniqlo.com/jp/'
    },
    {
      id: 3,
      title:
        'テストおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお',
      url:
        'https://github.com/poipoisaurus/subscmark?hogehogehogehogehogehogehogehoge'
    }
  ]

  const list = data.map(data => (
    <Box mb={4} key={data.id}>
      <LinkCard
        url={data.url}
        title={data.title}
        key={data.id}
        onFormOpen={onFormOpen}
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
        onClick={onFormOpen}>
        <AddIcon />
      </Fab>
      <FormDialog isOpen={open} onFormClose={onFormClose} />
    </React.Fragment>
  )
}
