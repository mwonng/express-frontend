import React from 'react';
import styled from 'styled-components';
// import { GoogleLogin } from 'react-google-login';
import AuthService from '../utils/AuthService'
const Auth = new AuthService(ENDPOINT)
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const GoogleSignIn = styled.div`
  margin: 1rem auto;
`

class GoogleLogin extends React.Component {
  componentDidMount() {
    gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 300,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
    // console.log("google user ->",googleUser)
  }

  async onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    try {
      const {data} = await Auth.verifyGoogleLogin(id_token);
      console.log("data->", data);
    } catch (err) {
      console.log("err->", err);
      throw err
    }
    // console.log("profile", profile.getEmail());
    // console.log("Id", profile.getId());
    // console.log("id_token", googleUser.getAuthResponse().id_token);
		// sessionStorage.setItem('authToken', profile.getId());
		// sessionStorage.setItem('name', profile.getName());
		// sessionStorage.setItem('imageUrl', profile.getImageUrl());
		// sessionStorage.setItem('email', profile.getEmail());

		// let account = this.props.cursor.refine('account');
		// account.refine('authToken').set(sessionStorage.getItem('authToken'));
		// account.refine('name').set(sessionStorage.getItem('name'));
		// account.refine('imageUrl').set(sessionStorage.getItem('imageUrl'));
		// account.refine('email').set(sessionStorage.getItem('email'));
  }

  onFailure(error) {
    console.log(error);
  }

  render() {
    return (
      <GoogleSignIn id="g-signin2"/>
    )
  }
}

export default GoogleLogin