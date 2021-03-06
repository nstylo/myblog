import React, { useState } from "react"
import styled from "styled-components"
import addToMailchimp from "gatsby-plugin-mailchimp"

import MailIcon from "../images/envelope-solid.svg"

const SubscriptionForm = () => {
  const [submitted, setSubmitted] = useState("not_submitted")
  const [mail, setMail] = useState("")

  const handleSubmit = e => {
    e.preventDefault() // do not reload page

    addToMailchimp(mail)
      .then(data => {
        if (data.result === "success") {
          setMail("")
          setSubmitted("success")
        } else {
          setSubmitted("failure") // user is already registered
        }
      })
      .catch(error => {
        setSubmitted("client_error")
        console.log(error) // TODO
      })
  }

  // set message to user after hitting subscribe button
  const msg =
    submitted === "success"
      ? "You have subscribed successfully!"
      : submitted === "failure"
      ? "Either your email is already registered or invalid."
      : "Client-side error occured, please reload the page."

  return (
    <Container>
      <Wrapper>
        <form name="email-newsletter" method="POST" onSubmit={handleSubmit}>
          <Header>Subscribe to my Newsletter</Header>
          <Paragraph>
            If you like to receive updates on new blog posts or projects, simply subscribe to my newsletter with your
            email address.
          </Paragraph>
          <InputField mail={mail} setMail={setMail} />
          <ResponseBanner submitted={submitted}>
            <p>{msg}</p>
          </ResponseBanner>
        </form>
      </Wrapper>
    </Container>
  )
}

const Paragraph = styled.p`
  margin-bottom: 20px;
`

const Header = styled.h3`
  margin: 0 0 10px 0;
`

// inner wrapper
const Wrapper = styled.div`
  width: 60%;
  padding: 40px 36px;
`

// outer wrapper
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #181818;
  padding: 30px 0;
  border-top: 1px solid ${props => props.theme.backgroundSecondary} !important;
`

const InputField = ({ mail, setMail }) => {
  return (
    <InputWrapper>
      <Label>
        <MailIcon />
      </Label>
      <Input mail={mail} setMail={setMail} />
      <SubButton>Subscribe</SubButton>
    </InputWrapper>
  )
}

const Label = styled.label.attrs(() => ({
  htmlFor: "subscriptionform-email",
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 8%;
  background-color: ${props => props.theme.primary};
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    fill: ${props => props.theme.foreground};
  }
`

const Input = styled.input.attrs(({ mail, setMail }) => ({
  type: "email",
  name: "email",
  id: "subscriptionform-email",
  value: mail,
  onChange: e => setMail(e.currentTarget.value),
}))`
  flex-basis: 72%;
  padding: 0 12px;
`

const SubButton = styled.button.attrs(() => ({
  type: "submit",
}))`
  flex-basis: 20%;
  color: ${props => props.theme.foreground};
  background-color: ${props => props.theme.primary};
  border: none;
  cursor: pointer;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1.2rem;
  margin-bottom: 16px;
`

const ResponseBanner = styled.div`
  width: 100%;
  height: 1.2rem;
  background-color: ${({ submitted, theme }) => (submitted === "success" ? theme.success : theme.error)};
  display: ${({ submitted }) => (submitted === "not_submitted" ? "none" : "flex")};
  aria-hidden: ${({ submitted }) => (submitted === "not_submitted" ? "true" : "false")};
  align-items: center;

  p {
    margin: 0 12px;
  }
`

export default SubscriptionForm
