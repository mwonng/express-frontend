import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: false
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] =  localStorage.getItem(process.env.TOKEN_KEY);
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth/token',
      data: {sendToken: localStorage.getItem(process.env.TOKEN_KEY)}
    })
    .then(response => {
      if (response.data.success) {
        console.log("auth success")
        this.setState({
          isLoading: false,
          isLogin: true,
        })
      } else {
        console.log("failed")
        this.setState({
          isLoading: false,
          isLogin: false
        })
        Router.push('/login')
      }
    })
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
          Admin page
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