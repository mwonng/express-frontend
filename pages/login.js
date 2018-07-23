import Panel from '../components/Panel'
import axios from 'axios'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';

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
      email: "",
      password: "",
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

  handleChange = (event) => {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = () => {
    let formObj = this.state
    Auth.login(formObj.email, formObj.password)
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
    return (
      <div>
        <h1>Welcome to login</h1>
        <Panel handleSubmit={this.handleSubmit} >
          <TextField
              id="email"
              label="Email"
              class="email"
              disable={true}
              onChange={this.handleChange}
          />
          <TextField
            id="password"
            label="Password"
            class="password"
            password
            disable={true}
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
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
        </Panel>
      </div>
    );
  }
}

export default Login