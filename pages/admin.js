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
    axios.defaults.headers.common['Authorization'] =  localStorage.getItem('express_frontend_token');
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth/token',
      data: {sendToken: localStorage.getItem('express_frontend_token') }
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
      console.log(this.state)
      return (
        <div> Loading ...</div>
      )
    }
    if (!this.state.isLoading && this.state.isLogin) {
      console.log(this.state)
      return (
        <div>
          Admin page
        </div>
      );
    }
    console.log(this.state)
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