import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Button, Form, Message} from 'semantic-ui-react'
import MainLogo from '../components/MainLogo'
import ImageUploader from 'react-images-upload'

let PICTURE_NAME
let PICTURE_URL

class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      bio: "",
      avatar: "",
      failedSignupMessageUsername: undefined,
      failedSignupMessagePassword: undefined,
      failedSignupMessagePasswordConfirmation: undefined,
      failedSignupMessageBio: undefined,
      failedSignupMessageAvatar: undefined
    }
  }

  handleSignupSubmit = () => {
    this.setState({failedSignupMessageUsername: undefined})
    this.setState({failedSignupMessagePassword: undefined})
    this.setState({failedSignupMessagePasswordConfirmation: undefined})
    this.setState({failedSignupMessageBio: undefined})
    this.setState({failedSignupMessageAvatar: undefined})
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          bio: this.state.bio,
          avatar: this.state.avatar,
          kind: 'user',
          games_played: 0,
          wins: 0,
          losses: 0,
          highest_score: 0
        }
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          if (data.error.username) {
            this.setState({failedSignupMessageUsername: ("Username " + data.error.username[0])})
          }
          if (data.error.password) {
            this.setState({failedSignupMessagePassword: ("Password " + data.error.password[0])})
          }
          if (data.error.password_confirmation) {
            this.setState({failedSignupMessagePasswordConfirmation: ("Password confirmation " + data.error.password_confirmation[0])})
          }
          if (data.error.bio) {
            this.setState({failedSignupMessageBio: ("Bio " + data.error.bio[0])})
          }
          if (data.error.avatar) {
            this.setState({failedSignupMessageAvatar: ("Avatar " + data.error.avatar[0])})
          }
        } else {
          fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          }).then(res => res.json())
            .then(data => {
              if (data.authenticated) {
                this.props.handleUpdateUserState(data.user)
                localStorage.setItem("token", data.token)
              }
            })
        }
      })
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({avatar: pictureDataURLs.slice(-1)[0]})
    document.getElementById('avatar-box').value = pictureFiles.slice(-1)[0].name
    PICTURE_NAME = pictureFiles.slice(-1)[0].name
    PICTURE_URL = pictureDataURLs.slice(-1)[0]
  }

  handleChangeOfAvatarName = (e, {name, value}) => {
    if (value !== PICTURE_NAME) {
      this.setState({avatar: ""})
    } else {
      this.setState({avatar: PICTURE_URL})
    }
  }

  render() {
    return (
      <div className="signup" id="signup-page">
        <div id="signup-page-mainlogo-holder">
          <MainLogo />
        </div>
        <div id="signup-page-signupform-holder">
            <div id="signup-form-signup-form">
              <div id="signup-page-signup-name">
                Sign Up
              </div>
              <Form size="tiny" onSubmit={this.handleSignupSubmit} error style={{width: "410px", textAlign: "left"}}>
              <Form.Group style={{display: 'flex', flexDirection: 'row', width: "100%", justifyContent: "center", marginBottom: "0px"}}>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "50%", marginLeft: "8px"}}>
                <Form.Input
                  type="text"
                  label="Username"
                  placeholder="Enter username..."
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                {this.state.failedSignupMessageUsername === undefined
                  ?
                  null
                  :
                  <Message
                    error
                    content={this.state.failedSignupMessageUsername}
                  />
                }
              </Form.Group>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "50%", marginLeft: "14px"}}>
                <Form.Input
                  type="password"
                  label="Password"
                  placeholder="Enter password..."
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                {this.state.failedSignupMessagePassword === undefined
                  ?
                  null
                  :
                  <Message
                    error
                    content={this.state.failedSignupMessagePassword}
                  />
                }
              </Form.Group>
              </Form.Group>
              <Form.Group style={{display: 'flex', flexDirection: 'row', width: "100%", justifyContent: "center", marginBottom: "0px"}}>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "50%", marginLeft: "8px"}}>
              <Form.Input
                type="text"
                label="Bio"
                placeholder="Enter your short bio..."
                name="bio"
                onChange={this.handleChange}
                value={this.state.bio}
              />
              {this.state.failedSignupMessageBio === undefined
                ?
                null
                :
                <Message
                  error
                  content={this.state.failedSignupMessageBio}
                />
              }
              </Form.Group>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "50%", marginLeft: "14px"}}>
              <Form.Input
                type="password"
                label="Confirm Password"
                placeholder="Enter password again..."
                name="password_confirmation"
                onChange={this.handleChange}
                value={this.state.password_confirmation}
              />
              {this.state.failedSignupMessagePasswordConfirmation === undefined
                ?
                null
                :
                <Message
                  error
                  content={this.state.failedSignupMessagePasswordConfirmation}
                />
              }
              </Form.Group>
              </Form.Group>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "100%", justifyContent: "center", marginBottom: "0px"}}>
              <Form.Group style={{display: 'flex', flexDirection: 'column', width: "99.4%", marginLeft: "8px"}}>
              <Form.Input
                type="text"
                label="Avatar"
                placeholder="Choose an image in the box below..."
                name="avatar"
                id="avatar-box"
                onChange={this.handleChangeOfAvatarName}
              />
              {this.state.failedSignupMessageAvatar === undefined
                ?
                null
                :
                <Message
                  error
                  content={this.state.failedSignupMessageAvatar}
                />
              }
              </Form.Group>
              <ImageUploader
                withIcon={false}
                buttonText='Choose from computer'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                style={{width: "96.5%", marginLeft: "14px", marginBottom: "5px"}}
              />
              </Form.Group>
                <Button size="tiny" type="submit" style={{marginLeft: "7.5px"}}>Submit</Button>
              </Form>
            </div>
        </div>
        <div id="signup-page-botaccount-holder">
          <div id="signup-page-botaccount-holder-inner">
            If you don't want to create an account, use the Bot account to <Link to="/login" style={{textDecoration: "underline", fontFamily: "Cairo"}}>log in</Link>.
          <br />
            <strong>Username</strong> bot
          <br />
            <strong>Password</strong> 123456
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignupForm)
