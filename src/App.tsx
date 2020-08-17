import React, { useState, useEffect } from 'react'
import { Container, Box, Fab, Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Add as AddIcon, Bookmarks as BookmarksIcon } from '@material-ui/icons'
import NavBar from './components/NavBar'
import FormDialog from './components/FormDialog'
import LinkCard from './components/LinkCard'
import DeleteConfirm from './components/DeleteConfirm'
import Copyright from './components/Copyright'
import { Bookmark } from './models'
import { getBookmarks } from './logic/Api'
import { isRead } from './logic/Date'

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
  },
  footer: {
    marginTop: 'auto',
  },
  bookmarkIcon: {
    height: 100,
    width: 100,
  },
  emptyText: {
    fontStyle: 'italic',
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
    const res = await getBookmarks()
    if (!res.userCd) {
      setObjects(res.Items)
    }
    setLoaded(true)
  }

  useEffect(() => {
    fetchBookmarks()
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
    setObject(undefined)
    setIsDeleteConfirmOpen(false)
  }

  const sortedObjects = objects
    .map(obj => ({
      ...obj,
      isRead: isRead(obj?.lastReadTime, obj?.type, obj?.date),
    }))
    .sort((a, b) => a.id - b.id)

  const linkCard = (data: Bookmark): JSX.Element => (
    <Box mb={4} key={data.id}>
      <LinkCard
        object={data}
        key={data.id}
        onFormOpen={onFormOpen}
        onDeleteConfirmOpen={onDeleteConfirmOpen}
      />
    </Box>
  )

  const readObjects = sortedObjects.filter(obj => obj.isRead).map(linkCard)

  const unreadObjects = sortedObjects.filter(obj => !obj.isRead).map(linkCard)

  const border =
    readObjects.length && unreadObjects.length ? (
      <Box mb={4} key={1}>
        <Divider variant="middle" />
      </Box>
    ) : null

  const skeletons = [...Array(4)].map((_, i) => (
    <Box mb={4} key={i}>
      <Skeleton key={i} height={76.89} variant="rect" />
    </Box>
  ))

  const empty = (
    <>
      <Box mt={15} mb={5} alignItems="center" justifyContent="center" display="flex">
        <BookmarksIcon className={classes.bookmarkIcon} color="disabled" />
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.emptyText}>
        No Subscmarks
      </Typography>
    </>
  )

  const result = objects.length ? [unreadObjects, border, readObjects] : empty

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" className={classes.container}>
        <Box my={4}>{isLoaded ? result : skeletons}</Box>
        <Box mb={5} className={classes.footer}>
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
      <FormDialog
        isOpen={isFormOpen}
        onFormClose={onFormClose}
        fetchBookmarks={fetchBookmarks}
        object={object}
      />
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        fetchBookmarks={fetchBookmarks}
        object={object}
      />
    </>
  )
}
