import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

const Timeago = props => {
  const {date} = props
  TimeAgo.addDefaultLocale(en)

  const timeAgo = new TimeAgo('en-US')

  if (date) {
    return <p>{timeAgo.format(new Date(date))}</p>
  }
  return null
}

export default Timeago
