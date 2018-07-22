import LoginForm from '../components/LoginForm'
import axios from 'axios'
import AuthService from '../utils/AuthService'
import Router from 'next/router'

const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginResult: ""
    }
  }

  componentDidMount() {
  }

  showErrorMsg(errorMsg) {
    this.setState({loginResult: errorMsg})
    setTimeout(()=>{
        //your function
        this.setState({loginResult: ""})
    }, 3000);
  }

  handleSubmit = (formObj) => {
    Auth.login(formObj.email, formObj.password)
    .then(response => {
      if (response.data.success) {
        addToLocalStorage(process.env.TOKEN_KEY, response.data.token)
        // this can be dashboard or any permitted page
        Router.push('/admin')
      } else {
        localStorage.setItem(process.env.TOKEN_KEY,'n/a')
        // notification for error
        this.showErrorMsg("login error")
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to login</h1>
        <LoginForm handleSubmit={this.handleSubmit} notification={this.state.loginResult}></LoginForm>
      </div>
    );
  }
}

export default Login