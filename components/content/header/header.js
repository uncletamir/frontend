import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import styles from './header.module.scss'
import utils from 'styles/utils.module.scss'

const header = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  return (
    <section className={styles.header} >
      <div className={[utils.container, styles.container].join(' ')}>
        <div className={styles.title}>
          <h3>Flickr</h3>
        </div>
        <div className={styles.search}>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)} />
          <Button size="sm" onClick={() => onSearch(search)}>
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}

export default header
