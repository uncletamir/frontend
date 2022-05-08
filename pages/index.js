import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Modal, Button } from 'react-bootstrap'

import axios from 'plugins/axios'

import Aux from 'components/hoc/hoc'
import Header from 'components/content/header/header'
import Feeds from 'components/content/feeds/feeds'

export default function Home() {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [lastFeedModified, setLastFeedModified] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (loading) {
      fetchImages(search)
    }
  }, [loading])

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  })

  const scrollHandler = (event) => {
    // If scroll reach bottom of the page
    if (!loading && window.pageYOffset >= window.document.body.clientHeight - window.document.body.clientHeight / 4) {
      setLoading(true)
    }
  }

  const searchHandler = (text) => {
    setSearch(text)
    setImages([])
    setLoading(true)
  }

  const fetchImages = async (search) => {
    let params = {}
    if (search) {
      params.tags = search
      params.tagmode = 'any'
    }
    try {
      const getImages = await axios.get('https://backend-flickr-test.herokuapp.com/images', {
        params
      })

      const { data } = getImages
      setLoading(false)
      if (lastFeedModified !== data.modified) {
        setLastFeedModified(data.modified)
        setImages(prevImages => [...prevImages, ...data.items])
      }
    } catch (err) {
      setError(true)
      console.log('SOMETHING WRONG', err)
    }
  }

  return (
    <Aux>
      <Head>
        <title>Flickrgram | Load Images on Your Scroll</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header onSearch={text => searchHandler(text)} />
        <Feeds images={images} loading={loading} />
      </main>

      <Modal
        show={error}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Something went wrong. Please try again later!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setError(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  )
}
