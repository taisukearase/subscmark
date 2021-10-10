import React from 'react'
import { Typography, Link } from '@material-ui/core'

const Copyright: React.FC = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright © {new Date().getFullYear()}{' '}
    <Link color="inherit" href="https://github.com/taisukearase/subscmark">
      taisukearase
    </Link>
  </Typography>
)

export default Copyright
