import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import Button from '../components/form-components/Button'
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT

const Auth = new AuthService(ENDPOINT)

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
    // axios.defaults.headers.common['Authorization'] =  localStorage.getItem(process.env.TOKEN_KEY);
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/auth/token',
    //   data: {sendToken: localStorage.getItem(process.env.TOKEN_KEY)}
    // })
    // .then(response => {
    //   if (response.data.success) {
    //     console.log("auth success",response.data)
    //     this.setState({
    //       isLoading: false,
    //       isLogin: true,
    //     })
    //   } else {
    //     console.log("failed")
    //     this.setState({
    //       isLoading: false,
    //       isLogin: false
    //     })
    //     Router.push('/login')
    //   }
    // })



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
            Router.push('/login')
          }
        })
        .catch(err => {
          Router.push('/login')
        })
    } else {
      Router.push('/login')
    }
    console.log("exp?", Auth.isTokenExpired(localStorage.getItem(process.env.TOKEN_KEY)))
    console.log("isLoggedin",isLoggedin)
  }

  logout() {
    Auth.logout()
    Router.push('/login')
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    if (!this.state.isLoading && this.state.isLogin) {
      return (
        <div>
          <h2>Admin page</h2>
          <Button
            color="red"
            onClick={this.logout}
            text="Sign out"
          />
        </div>
      );
    }
    return (
      <div>
        Please login
      </div>
    );
  }
}

Admin.propTypes = {

};

export default Admin;