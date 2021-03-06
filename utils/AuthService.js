import axios from 'axios';
import jwt from 'jsonwebtoken'
const FRONT_ENDPOINT = process.env.NODE_ENV === 'production'?process.env.FRONT_ENDPOINT:process.env.DEV_FRONT_ENDPOINT
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.END_POINT:process.env.DEV_END_POINT
export default class AuthService {
  constructor(domain) {
    this.domain = domain || ENDPOINT
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  async verifyGoogleLogin(token) {
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/verifyExternalLogin`,
      data: {token:token}
    })
  }

  async login(email, password) {
    let requestObj = {email, password}
    axios.defaults.headers.common['Authorization'] = this.getToken();
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/signin`,
      data: requestObj
    })
  }

  async forgetPassword(email) {
    let requestObj = {email}
    // axios.defaults.headers.common['Authorization'] = this.getToken();
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/forget/`,
      data: requestObj
    })
  }

  async resetPasswordTokenVerify(token) {
    let requestObj = {token}
    // axios.defaults.headers.common['Authorization'] = this.getToken();
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/verifyResetToken/`,
      data: requestObj
    })
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    let decoded = jwt.decode(token)
    if (decoded !== null) {
      let {exp} = decoded
      let current = Date.now()
      return ( exp*1000 - current <= 0 )? true:false
    } else {
      return true
      // throw new Error('a err or token invalid');
    }
  }

  // if token is available, auto login
  autoLogin(token){
    axios.defaults.headers.common['Authorization'] =  localStorage.getItem(process.env.TOKEN_KEY);
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/verifySigninToken`,
      data: {
        token: localStorage.getItem(process.env.TOKEN_KEY)
        // token: token
      }    // this is useless
    })
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  async getProfile(){
    // Retrieves the profile data from localStorage

    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem(process.env.TOKEN_KEY, idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem(process.env.TOKEN_KEY)
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem(process.env.TOKEN_KEY);
    localStorage.removeItem(process.env.SESSION_KEY);
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }
}