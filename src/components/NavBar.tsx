import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    position: 'absolute',
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar: React.FC = () => {
  const classes = useStyles()

  const onReload = (): void => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="center">
            <span style={{ cursor: 'pointer' }} onClick={onReload}>
              Subscmark
            </span>
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
