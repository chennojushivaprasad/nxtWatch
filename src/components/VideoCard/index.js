// import {Link} from 'react-router-dom'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

import {
  ItemLink,
  VideoCardListItem,
  VideoCardThumbNailImage,
  VideoCardVideoDetails,
  VideoCardProfileImage,
  VideoCardContentSection,
  VideoCardTitle,
  VideoCardChannelName,
  VideoCardViewsAndDate,
  VideoCardDot,
} from './styledComponents'
import Timeago from '../Timeago'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

        return (
          <ItemLink to={`/videos/${id}`} className="link">
            <VideoCardListItem>
              <VideoCardThumbNailImage
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <VideoCardVideoDetails>
                <VideoCardProfileImage
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <VideoCardContentSection>
                  <VideoCardTitle color={textColor}>{title}</VideoCardTitle>
                  <VideoCardChannelName color={textColor}>
                    {name}
                  </VideoCardChannelName>
                  <VideoCardViewsAndDate color={textColor}>
                    <p> {viewCount} views</p>
                    <VideoCardDot> &#8226; </VideoCardDot>
                    <Timeago date={publishedAt} />
                  </VideoCardViewsAndDate>
                </VideoCardContentSection>
              </VideoCardVideoDetails>
            </VideoCardListItem>
          </ItemLink>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default VideoCard
