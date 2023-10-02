import {useState, useContext, useCallback, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SideBar from '../Sidebar'
import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'
import FailureView from '../FailureView'
import PlayVideoView from '../PlayVideoView'

import {VideoDetailViewContainer, LoaderContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function VideoDetailView(props) {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [videoDetails, setVideoDetails] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isDisLiked, setIsDisLiked] = useState(false)

  const {match} = props
  const {params} = match
  const {id} = params

  const formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  })

  const getVideoDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = formattedData(data)
        setVideoDetails(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  const clickLiked = () => {
    setIsLiked(!isLiked)
    setIsDisLiked(false)
  }

  const clickDisLiked = () => {
    setIsDisLiked(!isDisLiked)
    setIsLiked(false)
  }

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </LoaderContainer>
  )

  const renderPlayVideoView = () => (
    <PlayVideoView
      videoDetails={videoDetails}
      clickLiked={clickLiked}
      clickDisLiked={clickDisLiked}
      isLiked={isLiked}
      isDisLiked={isDisLiked}
    />
  )

  const onRetry = () => {
    getVideoDetails()
  }

  const renderFailureView = () => <FailureView onRetry={onRetry} />

  const renderVideoDetailView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPlayVideoView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [getVideoDetails])

  const {isDarkTheme} = useContext(ThemeAndVideoContext)
  const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

  return (
    <>
      <Header />
      <SideBar />
      <VideoDetailViewContainer
        data-testid="videoItemDetails"
        bgColor={bgColor}
      >
        {renderVideoDetailView()}
      </VideoDetailViewContainer>
    </>
  )
}

export default VideoDetailView
