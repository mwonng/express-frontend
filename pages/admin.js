import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import Button from '../components/form-components/Button'
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT

const Auth = new AuthService(ENDPOINT)
const {Provider, Consumer} = React.createContext('light');
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: false
    }
  }

  componentDidMount() {
    let token = localStorage.getItem(process.env.TOKEN_KEY)
    let isLoggedin =Auth.loggedIn()
    if (isLoggedin) {
      Auth.autoLogin(token)
        .then(response => {
          if (response.data.success) {
            console.log("Authenticate success")
            this.setState({
              isLoading: false,
              isLogin: true,
            })
          } else {
            this.setState({
              isLoading: false,
              isLogin: false
            })
            Router.push('/signin')
          }
        })
        .catch(err => {
          Router.push('/signin')
        })
    } else {
      Router.push('/signin')
    }
    // console.log("exp?", Auth.isTokenExpired(localStorage.getItem(process.env.TOKEN_KEY)))
    // console.log("isLoggedin",isLoggedin)
  }

  logout() {
    Auth.logout()
    Router.push('/signin')
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    if (!this.state.isLoading && this.state.isLogin) {
      return (
        <Provider value={{name:"-m", role:"admin"}}>
          <div>
            <h2>Admin page</h2>
            <Toolbar />
            <Button
              color="red"
              onClick={this.logout}
              text="Sign out"
            />
          </div>
        </Provider>

      );
    }
    return (
      <div>
        Please login
      </div>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // Use a Consumer to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <Consumer>
      {currentUser => <b>{currentUser.role}</b> }
    </Consumer>
  );
}


Admin.propTypes = {

};

export default Admin;