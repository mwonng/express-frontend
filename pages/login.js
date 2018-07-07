import LoginForm from '../components/LoginForm'
import axios from 'axios'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
const Auth = new AuthService('http://localhost:3000')


class Login extends React.Component {
  componentDidMount() {

  }

  handleSubmit = (formObj) => {
    Auth.login(formObj.email, formObj.password)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem(process.env.TOKEN_KEY, response.data.token)
        sessionStorage.setItem(process.env.SESSION_KEY, response.data.token)
        // this can be dashboard or any permitted page
        Router.push('/admin')
      } else {
        localStorage.setItem(process.env.TOKEN_KEY,'n/a')
        console.log(" if not success failed")
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to login</h1>
        <LoginForm handleSubmit={this.handleSubmit} ></LoginForm>
      </div>
    );
  }
}

export default Login