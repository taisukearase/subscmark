import React, { useState, useEffect } from 'react'
import { Container, Box, Fab, Divider, Card, CardContent } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Add as AddIcon } from '@material-ui/icons'
import NavBar from './components/NavBar'
import FormDialog from './components/FormDialog'
import LinkCard from './components/LinkCard'
import DeleteConfirm from './components/DeleteConfirm'
import BlankSlate from './components/BlankSlate'
import Copyright from './components/Copyright'
import { Bookmark } from './models'
import { postUser, putUser } from './logic/Api'
import { isRead } from './logic/Date'
import * as storage from './logic/Storage'
import SettingDialog from './components/SettingDialog'

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
  card: {
    height: '76.8906px',
  },
}))

export default function App(): JSX.Element {
  const classes = useStyles()
  const [isLoaded, setLoaded] = useState<boolean>(false)
  const [objects, setObjects] = useState<Bookmark[]>([])
  const [object, setObject] = useState<Bookmark | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false)
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)

  const loginUser = async (isLogout = false): Promise<void> => {
    const userCd = isLogout ? null : storage.getUserCd()
    const res = await postUser({ userCd })
    if (res.userCd) {
      storage.setUserCd(res.userCd)
    }
    setObjects(res.Items || [])
    setLoaded(true)
  }

  useEffect(() => {
    loginUser()
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
  const onSettingOpen = (): void => {
    setIsSettingOpen(true)
  }
  const onSettingClose = (): void => {
    setIsSettingOpen(false)
  }
  const restoreUser = async (userCd: string): Promise<void> => {
    const res = await putUser({ userCd })
    if (res.userCd) {
      storage.setUserCd(res.userCd)
    }
    if (res.Items) {
      setObjects(res.Items)
    }
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
      <Card className={classes.card}>
        <CardContent>
          <Skeleton animation="wave" height={20} width="40%" style={{ marginBottom: 9 }} />
          <Skeleton animation="wave" height={15} width="70%" />
        </CardContent>
      </Card>
    </Box>
  ))

  const contents = objects.length ? (
    [unreadObjects, border, readObjects]
  ) : (
    <BlankSlate
      onFormOpen={(): void => {
        onFormOpen()
      }}
    />
  )

  return (
    <>
      <NavBar onSettingOpen={onSettingOpen} />
      <Container maxWidth="sm" className={classes.container}>
        <Box my={4}>{isLoaded ? contents : skeletons}</Box>
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
        loginUser={loginUser}
        object={object}
      />
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        loginUser={loginUser}
        object={object}
      />
      <SettingDialog
        isOpen={isSettingOpen}
        onFormClose={onSettingClose}
        restoreUser={restoreUser}
        loginUser={loginUser}
      />
    </>
  )
}
