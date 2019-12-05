import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"
import LinkedInSvg from "../images/linkedin.svg"
import RssSvg from "../images/rss.svg"

interface ItemProps {
  name: string
  path: string // path to redirect on click
  className: string
}

const Item = ({ name, path, className }: ItemProps): JSX.Element => (
  <Container>
    <h3 className={className}>
      <StyledLink to={path}>{name}</StyledLink>
    </h3>
  </Container>
)

interface MainItemProps {
  name: string
  path?: string // path is optional, default is "/"
  className: string
}

const MainItem = ({ name, path = "/", className }: MainItemProps): JSX.Element => (
  <Container>
    <h2 className={className}>
      <StyledLink to={path}>{name}</StyledLink>
    </h2>
  </Container>
)

interface ImageLinkProps {
  path?: string
  imgSource: string
  alt: string
  className: string
}

const ImageLink = ({ path = "/", imgSource, alt, className }: ImageLinkProps): JSX.Element => (
  <Link to={path} className={className}>
    <img src={imgSource} alt={alt} />
  </Link>
)

const StyledImageLink = styled(ImageLink)`
  height: 100%;
  width: auto;
  img {
    height: 100%;
    width: 40px;
    margin: 0 10px;
  }
`

interface HeaderProps {
  siteTitle: string
  className: string
}

const Header = ({ siteTitle, className }: HeaderProps): JSX.Element => (
  <header className={className}>
    <HeaderWrapper>
      <MainItem name={siteTitle} className={"mainitem"} />
      <StyledItem name="Home" path="/" className={"item"} />
      <StyledItem name="Projects" path="/projects" className={"item"} />
      <StyledItem name="Blog" path="/blog" className={"item"} />
      <Container>
        <StyledImageLink path="/test" imgSource={LinkedInSvg} alt="LinkedIn" className="imagelink" />
        <StyledImageLink path="/test" imgSource={RssSvg} alt="RSS" className="imagelink" />
      </Container>
    </HeaderWrapper>
  </header>
)

const StyledItem = styled(Item)``

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  max-width: 1280px;
  max-height: 40px;
  padding: 0.5rem 0.5rem;
`

const StyledLink = styled(Link)`
  color: ${(props): string => props.theme.foreground};
  text-decoration: none;
`

const StyledHeader = styled(Header)`
  background-color: transparent;
`

export default StyledHeader
