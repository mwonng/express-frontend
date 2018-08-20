import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import UserAction from '../utils/UserService'
import Button from '../components/form-components/Button'
import jwt from 'jsonwebtoken'
import withContainer from '../components/layouts/Container'
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT

const Auth = new AuthService(ENDPOINT)
const User = new UserAction()
const UserContext = React.createContext();
@withContainer
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
              currentUser: response.data.currentUser
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
          }
        })
        .catch(err => {
          Router.push({
            pathname: '/signin',
            query: { error: 'authentica failed' }
          })
        })
    } else {
      Router.push({
        pathname: '/signin',
        query: { error: 'expired or token error' }
      })
    }
  }

  logout() {
    Auth.logout()
    Router.push('/signin')
  }

  archiveAccount() {
    const token = localStorage.getItem(process.env.TOKEN_KEY);
    User.archiveUser(token)
      .then( response => {
        if (response.data.success) {
          Auth.logout()
          Router.push('/')
        }
      })
      .catch( err => {
        throw err;
      });
  }

  // getCurrentUserId() {
  //   let decode = jwt.decode(localStorage.getItem(process.env.TOKEN_KEY))
  //   return decode.data.currentUser
  // }

  // getCurrentUser(user) {
  //   return user
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    if (!this.state.isLoading && this.state.isLogin) {
      return (
        <UserContext.Provider value={this.state.currentUser}>
          <div>
            <h1>Admin page</h1>
            <UserArea />
            <Button
              color="teal"
              onClick={this.logout}
              text="Sign out"
            />
            <div>
              <Button
                color="darkred"
                onClick={this.archiveAccount}
                text="Archive my account"
              />
            </div>
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
function UserArea(props) {
  return (
    <div>
      <UserInfo />
    </div>
  );
}

function UserInfo(props) {
  // Use a Consumer to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <UserContext.Consumer>
      { currentUser => {
        if (currentUser) {
          var email = currentUser.email
        } else {
          var email = "no email"
        }
        return(<b>Hello, {email}</b>)
        }
      }
    </UserContext.Consumer>
  );
}


Admin.propTypes = {

};

export default Admin;