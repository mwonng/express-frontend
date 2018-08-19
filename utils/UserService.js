import axios from 'axios';
import jwt from 'jsonwebtoken'
const FRONT_ENDPOINT = process.env.NODE_ENV === 'production'?process.env.FRONT_ENDPOINT:process.env.DEV_FRONT_ENDPOINT
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.END_POINT:process.env.DEV_END_POINT

export default class UserService {
  constructor(domain) {
    this.domain = domain || ENDPOINT
    this.createUser = this.createUser.bind(this)
    // this.getProfile = this.getProfile.bind(this)
  }

  createUser(email, password) {
    let requestObj = {email, password}
    // axios.defaults.headers.common['Authorization'] = this.getToken();
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/signup`,
      data: requestObj
    })
  }

  resetPassword(token, password) {
    let requestObj = {token,password}
    return axios({
      method: 'post',
      url: `${ENDPOINT}/auth/resetPassword`,
      data: requestObj
    })

    // verify token

    // if verified, decode email from token

    // update password
  }

  deleteUser() {

  }

  updateUser() {

  }

}