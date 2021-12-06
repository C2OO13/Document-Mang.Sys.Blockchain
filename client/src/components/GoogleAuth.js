import React from "react"

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null,
    userId: null,
  }

  componentDidMount() {
    // loading up the OAuth Library from google servers
    window.gapi.load("client:auth2", () => {
      // initializing with google OAuth Client Id and scope
      window.gapi.client
        .init({
          clientId:
            "922603664055-rgd2dan2rqmio280911p6n1s475h4jjp.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // creating an Auth Obejct
          this.auth = window.gapi.auth2.getAuthInstance()
          this.onAuthChange(this.auth.isSignedIn.get())
          // setting up listener to listen for updates to Authentication status, executes the argument function with
          // current Authentication status as parameter
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.setState({
        isSignedIn: true,
        userId: this.auth.currentUser.get().getId(),
      })
    } else {
      this.setState({
        isSignedIn: false,
        userId: null,
      })
    }
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    }
    return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    )
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

export default GoogleAuth
