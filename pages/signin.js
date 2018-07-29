import Panel from '../components/Panel'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';
import Link from 'next/link'
import withContainer from '../components/layouts/Container'

const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

@withContainer
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      loginResult: ""
    }
    this.hideErr = this.hideErr.bind(this)
  }

  static async getInitialProps ({ query }) {
    return {query:query}
  }

  componentDidMount() {
    // if (this.props.query.error) {
    //   this.setState({loginResult: this.props.query.error })
    // }
  }

  componentWillUnmount() {
  }

  showErrorMsg(errorMsg) {
    this.setState({loginResult: errorMsg})
  }

  hideErr() {
      //your function
      this.setState({loginResult: ""})
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
        // addToLocalStorage('currentUserId', response.data.currentUser._id)
        // this can be dashboard or any permitted page
        Router.push('/admin')
      } else {
        localStorage.setItem(process.env.TOKEN_KEY,'n/a')
        // localStorage.removeItem('currentUserId')
        // notification for error
        this.showErrorMsg(response.data.msg)
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Sign in</h1>
        <Panel title="Sign In" >
          <TextField
            id="email"
            label="Email"
            class="email"
            disable={true}
            onChange={this.handleChange}
            onFocus={this.hideErr}
          />
          <TextField
            id="password"
            label="Password"
            class="password"
            password
            disable={true}
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
            onFocus={this.hideErr}
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
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
          <div>
            <Link href="/index">
              <a>Forget password?</a>
            </Link>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Login