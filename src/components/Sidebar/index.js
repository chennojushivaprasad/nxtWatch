import {useContext} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'
import {
  SidebarLgContainer,
  NavOptions,
  SidebarLink,
  SidebarContainer,
  NavText,
  ContactInfo,
  ContactHeading,
  ContactIcons,
  ContactNote,
  ContactImage,
  SidebarSmallContainer,
  Sidebar,
} from './styledComponents'

function SideBar() {
  const value = useContext(ThemeAndVideoContext)
  const {isDarkTheme, activeTab, changeTab} = value

  const bgColor = isDarkTheme ? '#231f20' : '#f1f5f9'
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
  const activeTabBg = isDarkTheme ? '#475569' : '#cbd5e1'

  const onClickTab = tabName => {
    changeTab(tabName)
  }

  return (
    <Sidebar>
      <SidebarLgContainer bgColor={bgColor}>
        <NavOptions>
          <SidebarLink to="/">
            <SidebarContainer
              key="home"
              bgColor={activeTab === 'Home' ? activeTabBg : 'none'}
              onClick={() => onClickTab('Home')}
            >
              <AiFillHome
                size={30}
                color={activeTab === 'Home' ? '#ff0b37' : '#909090'}
              />
              <NavText color={textColor}>Home</NavText>
            </SidebarContainer>
          </SidebarLink>

          <SidebarLink to="/trending">
            <SidebarContainer
              key="trending"
              bgColor={activeTab === 'Trending' ? activeTabBg : 'none'}
              onClick={() => onClickTab('Trending')}
            >
              <HiFire
                size={30}
                color={activeTab === 'Trending' ? '#ff0b37' : '#909090'}
              />
              <NavText color={textColor}>Trending</NavText>
            </SidebarContainer>
          </SidebarLink>

          <SidebarLink to="/gaming">
            <SidebarContainer
              key="gaming"
              bgColor={activeTab === 'Gaming' ? activeTabBg : 'none'}
              onClick={() => onClickTab('Gaming')}
            >
              <SiYoutubegaming
                size={30}
                color={activeTab === 'Gaming' ? '#ff0b37' : '#909090'}
              />
              <NavText color={textColor}>Gaming</NavText>
            </SidebarContainer>
          </SidebarLink>

          <SidebarLink to="/saved-videos">
            <SidebarContainer
              key="saved"
              bgColor={activeTab === 'Saved' ? activeTabBg : 'none'}
              onClick={() => onClickTab('Saved')}
            >
              <CgPlayListAdd
                size={30}
                color={activeTab === 'Saved' ? '#ff0b37' : '#909090'}
              />
              <NavText color={textColor}>Saved Videos</NavText>
            </SidebarContainer>
          </SidebarLink>
        </NavOptions>
        <ContactInfo>
          <ContactHeading color={textColor}>CONTACT US</ContactHeading>
          <ContactIcons>
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <ContactImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </ContactIcons>
          <ContactNote color={textColor}>
            Enjoy! Now to see your channels and recommendations!
          </ContactNote>
        </ContactInfo>
      </SidebarLgContainer>
      <SidebarSmallContainer bgColor={bgColor}>
        <SidebarLink to="/">
          <AiFillHome
            size={30}
            onClick={() => onClickTab('Home')}
            color={activeTab === 'Home' ? '#ff0b37' : '#909090'}
          />
        </SidebarLink>
        <SidebarLink to="/trending">
          <HiFire
            size={30}
            onClick={() => onClickTab('Trending')}
            color={activeTab === 'Trending' ? '#ff0b37' : '#909090'}
          />
        </SidebarLink>
        <SidebarLink to="/gaming">
          <SiYoutubegaming
            size={30}
            onClick={() => onClickTab('Gaming')}
            color={activeTab === 'Gaming' ? '#ff0b37' : '#909090'}
          />
        </SidebarLink>
        <SidebarLink to="/saved-videos">
          <CgPlayListAdd
            size={30}
            onClick={() => onClickTab('Saved')}
            color={activeTab === 'Saved' ? '#ff0b37' : '#909090'}
          />
        </SidebarLink>
      </SidebarSmallContainer>
    </Sidebar>
  )
}

export default SideBar
