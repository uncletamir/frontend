import { Card } from 'react-bootstrap'
import { DateTime } from 'luxon'

const feed = ({ image, title, publishedAt, author }) => {
  const formatDate = date => {
    var now = DateTime.now();
    var published = DateTime.fromISO(date);
    const { days, hours, minutes, seconds } = now.diff(published, ['days', 'hours', 'minutes', 'seconds']) 

    if (seconds < 60 && minutes <= 0 && hours <= 0 && days <= 0) {
      return 'Few seconds ago'
    } else if (minutes < 60 && hours <= 0 && days <= 0) {
      return `${minutes} minutes ago`
    } else if (hours < 24 && days <= 0) {
      return `${hours} hours ago`
    } else {
      return published.toFormat('dd MMM y')
    }
  }

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="blockquote-footer">
          {formatDate(publishedAt)} by <a href={author.link} target="_blank">{author.name}</a>
        </div>
      </Card.Body>
    </Card>
  )
}

export default feed
