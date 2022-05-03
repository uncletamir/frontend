import { Spinner } from 'react-bootstrap'

import Feed from './feed/feed'

import styles from './feeds.module.scss'
import utils from 'styles/utils.module.scss'

const feeds = ({ images, loading }) => {
  const feed = images.map((image, index) => {
    const author = {
      name: image.author.split('"')[1],
      link: `https://www.flickr.com/people/${image.author_id}`
    }
    return <Feed key={index} image={image.media.m} title={image.title} publishedAt={image.published} author={author} />
  })
  return (
    <section className={styles.feeds}>
      <div className={[utils.container, styles.container].join(' ')}>
        {feed}
        { loading && <Spinner animation="border" /> }
        <div className="action">
        </div>
      </div>
    </section>
  )
}

export default feeds
