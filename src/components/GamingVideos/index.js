import {useState, useEffect, useCallback, useContext} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../Sidebar'
import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'
import FailureView from '../FailureView'
import GameVideoCard from '../GameVideoCard'
import {
  GamingContainer,
  GamingTitleIconContainer,
  GamingVideoTitle,
  GamingVideoList,
  GamingText,
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function GamingVideos() {
  const [gamingVideos, setGamingVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const value = useContext(ThemeAndVideoContext)
  const {isDarkTheme} = value

  const getVideos = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
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
        const updatedData = data.videos.map(eachVideo => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
        }))
        setGamingVideos(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </LoaderContainer>
  )

  const renderVideosView = () => (
    <GamingVideoList>
      {gamingVideos.map(eachVideo => (
        <GameVideoCard key={eachVideo.id} videoDetails={eachVideo} />
      ))}
    </GamingVideoList>
  )

  const onRetry = () => {
    getVideos()
  }

  const renderFailureView = () => <FailureView onRetry={onRetry} />

  const renderTrendingVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  useEffect(() => {
    getVideos()
  }, [getVideos])

  return (
    <div>
      <Header />
      <SideBar />
      <GamingContainer
        data-testid="gaming"
        bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
      >
        <GamingVideoTitle>
          <GamingTitleIconContainer>
            <SiYoutubegaming size={35} color="#ff0000" />
          </GamingTitleIconContainer>
          <GamingText color={isDarkTheme ? '#f9f9f9' : '#231f20'}>
            Gaming
          </GamingText>
        </GamingVideoTitle>
        {renderTrendingVideos()}
      </GamingContainer>
    </div>
  )
}

export default GamingVideos
