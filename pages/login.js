import LoginForm from '../components/LoginForm'
import axios from 'axios'
import AuthService from '../utils/AuthService'
import Router from 'next/router'

const Auth = new AuthService('http://localhost:3000')

class Login extends React.Component {
  componentDidMount() {

  }

  handleSubmit = (formObj) => {
    axios.defaults.headers.common['Authorization'] = Auth.getToken();
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth',
      data: formObj
    })
    .then(response => {
      if (response.data.success) {
        localStorage.setItem(process.env.TOKEN_KEY, response.data.token)
        sessionStorage.setItem(process.env.SESSION_KEY, response.data.token)
        console.log("response token:", response.data.token)
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
        <LoginForm handleSubmit={this.handleSubmit} text="test text"></LoginForm>
      </div>
    );
  }
}

export default Login