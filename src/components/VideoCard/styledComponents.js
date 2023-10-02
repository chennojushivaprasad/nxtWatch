import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const ItemLink = styled(Link)`
  text-decoration: none;
`

export const VideoCardListItem = styled.li`
  background: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding-left: 40px;
  }
`

export const VideoCardThumbNailImage = styled.img`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 300px;
  }
`
export const VideoCardVideoDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
export const VideoCardProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin: 10px 0;
  border-radius: 50px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const VideoCardContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;
  @media screen and (min-width: 768px) {
    margin-left: 20px;
  }
`
export const VideoCardTitle = styled.p`
  font-family: Roboto;
  font-size: 15px;
  color: ${props => props.color};
`
export const VideoCardChannelName = styled.p`
  font-family: Roboto;
  font-size: 13px;
  color: ${props => props.color};
`
export const VideoCardViewsAndDate = styled.p`
  font-family: Roboto;
  font-size: 12px;
  color: ${props => props.color};
  display: flex;
`
export const VideoCardDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
`
