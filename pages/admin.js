import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import Button from '../components/form-components/Button'
import jwt from 'jsonwebtoken'
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT

const Auth = new AuthService(ENDPOINT)
const UserContext = React.createContext();
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
            Router.push({
              pathname: '/signin',
              query: { error: 'cannot auto login' }
            })
            // this.showErrorMsg("Hey here1 ")
          }
        })
        .catch(err => {
          Router.push({
            pathname: '/signin',
            query: { error: 'authentica failed' }
          })
          // this.showErrorMsg("Hey here2 ")
        })
    } else {
      Router.push({
        pathname: '/signin',
        query: { error: 'expired or token error' }
      })
    }
    // console.log("exp?", Auth.isTokenExpired(localStorage.getItem(process.env.TOKEN_KEY)))
    // console.log("isLoggedin",isLoggedin)
  }

  logout() {
    Auth.logout()
    Router.push('/signin')
  }

  getCurrentUserId() {
    let decode = jwt.decode(localStorage.getItem('auth_jwt'))
    return decode.data.currentUser
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    if (!this.state.isLoading && this.state.isLogin) {
      return (
        <UserContext.Provider value={this.getCurrentUserId()}>
          <div>
            <h2>Admin page</h2>
            <Toolbar />
            <Button
              color="red"
              onClick={this.logout}
              text="Sign out"
            />
          </div>
        </UserContext.Provider>

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
    <UserContext.Consumer>
      {currentUserId => <b>{currentUserId}</b> }
    </UserContext.Consumer>
  );
}


Admin.propTypes = {

};

export default Admin;