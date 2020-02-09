import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
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

export default function App() {
  const [open, setOpen] = useState(false)

  const onModalOpen = () => {
    setOpen(true)
  }

  const onModalClose = () => {
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
      title: 'テストおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお',
      url: 'https://www.amazon.co.jp/?&tag=hydraamazonav-22&ref=pd_sl_7ibq2d37on_e&adgrpid=56100363354&hvpone=&hvptwo=&hvadid=289260145877&hvpos=1t1&hvnetw=g&hvrand=5806174922413686552&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009307&hvtargid=aud-759377471893:kwd-10573980&hydadcr=27922_11415158&gclid=Cj0KCQiAvc_xBRCYARIsAC5QT9luL1CJpQOVegh7JMuYNUzaiEUv970WqCpi8wayTwYPCslXv-ueHjIaAhKzEALw_wcB'
    }
  ]

  const list = data.map(data => (
    <Box mb={4} key={data.id}>
      <LinkCard url={data.url} title={data.title} key={data.id} onModalOpen={onModalOpen}/>
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
      <Modal isOpen={open} onModalClose={onModalClose}/>
    </React.Fragment>
  )
}
