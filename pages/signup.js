import Panel from '../components/Panel'
import UserService from '../utils/UserService'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';
import Link from 'next/link'
import withContainer from '../components/layouts/Container'
const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)
const UserAction = new UserService(ENDPOINT)

import jwt from 'jsonwebtoken'

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

const validatePassword = (password) => {
  var strongRegex = new RegExp("^(?=.*[0-9])(?=.{6,})");
  if (!strongRegex.test(password)) {
    return false
  }
  return true
}

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return false
  }
  return true
}

@withContainer
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      loginResult: "",
      isLoading: true,
      isLogin: false
    }
    this.isMatched = this.isMatched.bind(this)
  }

  componentDidMount() {
    console.log("isExpried? ->", Auth.isTokenExpired(Auth.getToken()))
    this.setState ({ isLoading: false })
  }

  validateConfirmPassword(passwordConfirm) {
    return this.isMatched.bind(this)
  }

  isMatched() {
    return this.state.password === this.state.passwordConfirm
  }

  showErrorMsg(errorMsg) {
    clearTimeout()
    this.setState({loginResult: errorMsg})
  }

  hideErr() {
    //your function
    this.setState({loginResult: ""})
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value}, ()=>console.log("signup state->", this.state))
  }

  handleSubmit = () => {
    let formObj = this.state
    UserAction.createUser(formObj.email, formObj.password)
    .then(response => {
      if (response.data.success) {
        addToLocalStorage(process.env.TOKEN_KEY, response.data.token)
        // this can be dashboard or any permitted page
        Router.push('/admin')
      } else {
        localStorage.setItem(process.env.TOKEN_KEY,'n/a')
        // notification for error
        this.showErrorMsg(response.data.msg)
      }
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    return (
      <div>
        <h1>Sign up </h1>
        <Panel title="Sign up">
          <TextField
              id="email"
              label="Email"
              class="email"
              disable={true}
              onChange={this.handleChange}
              validate={validateEmail}
          />
          <TextField
            class="password"
            disable={true}
            id="password"
            label="Password"
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
            validate={validatePassword}
            password
          />
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            class="password"
            disable={true}
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
            isMatch={this.state.password === this.state.passwordConfirm}
            password
          />
          <Button
            color="#0000cc"
            text="Submit"
            onClick={this.handleSubmit}
          />
          { this.state.loginResult &&
            <div>
              <b style={{color:"red"}}>{this.state.loginResult}</b>
            </div>
          }
          <div>
            <Link href="/signin">
              <a>Sign in</a>
            </Link>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Signup