import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Box, Fab } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Add as AddIcon } from '@material-ui/icons'
import NavBar from './components/NavBar'
import FormDialog from './components/FormDialog'
import LinkCard from './components/LinkCard'
import DeleteConfirm from './components/DeleteConfirm'
import Copyright from './components/Copyright'
import { Bookmark } from './models'

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default function App(): JSX.Element {
  const classes = useStyles()
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const [objects, setObjects] = useState<Bookmark[]>([])
  const [object, setObject] = useState<Bookmark | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false)

  const fetchBookmarks = async (): Promise<void> => {
    const res = await axios.get(
      'https://so88ofhp4e.execute-api.ap-northeast-1.amazonaws.com/bookmarks'
    )
    setObjects(res.data.Items)
  }

  useEffect(() => {
    fetchBookmarks()
    setLoaded(true)
  }, [])

  const onFormOpen = (obj?: Bookmark): void => {
    setObject(obj)
    setIsFormOpen(true)
  }
  const onFormClose = (): void => {
    setObject(undefined)
    setIsFormOpen(false)
  }
  const onDeleteConfirmOpen = (obj?: Bookmark): void => {
    setObject(obj)
    setIsDeleteConfirmOpen(true)
  }
  const onDeleteConfirmClose = (): void => {
    setIsDeleteConfirmOpen(false)
  }

  const list = isLoaded
    ? objects.map(data => (
        <Box mb={4} key={data.id}>
          <LinkCard
            object={data}
            key={data.id}
            onFormOpen={onFormOpen}
            onDeleteConfirmOpen={onDeleteConfirmOpen}
          />
        </Box>
      ))
    : [...Array(4)].map((_, i) => (
        <Box mb={4} key={i}>
          <Skeleton key={i} height={76.89} variant="rect" />
        </Box>
      ))

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box my={4}>
          {list}
          <Copyright />
        </Box>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={(): void => {
          onFormOpen()
        }}>
        <AddIcon />
      </Fab>
      <FormDialog isOpen={isFormOpen} onFormClose={onFormClose} object={object} />
      <DeleteConfirm isOpen={isDeleteConfirmOpen} onClose={onDeleteConfirmClose} object={object} />
    </>
  )
}
