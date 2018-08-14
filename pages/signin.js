import Panel from '../components/Panel'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';
import Link from 'next/link'
import withContainer from '../components/layouts/Container'
import FlashMessage from '../components/form-components/FlashMessage';
import withFlashMessage from '../components/layouts/withFlashMessage'
import {OneColumnMid} from '../components/layouts/Grids';

const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

@withContainer
@withFlashMessage
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      flashMessage:"",
      loginResult: ""
    }
    this.hideErr = this.hideErr.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        this.setState({
          showFlashMessage: true,
          flashMessage:{
            type: 'error',
            message: response.data.msg
          }
        });
        // localStorage.removeItem('currentUserId')
        // notification for error
        this.showErrorMsg(response.data.msg)
      }
    })
  }

  render() {
    const { showFlashMessage, flashMessage } = this.state;
    return (
      <div>
        <OneColumnMid>
          <h1>Sign in</h1>
          <Panel title="Sign In" >
            { showFlashMessage &&
              <FlashMessage
                text={message}
                type={type}
                callback={this.flashMessageCallback}
              >{flashMessage.message}
              </FlashMessage>
            }
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
              color="#5EBBB3"
              text="Submit"
              onClick={this.handleSubmit}
            />
            <div>
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </div>
            <div>
              <Link href="/forget">
                <a>Forget password?</a>
              </Link>
            </div>
          </Panel>
        </OneColumnMid>

      </div>
    );
  }
}

export default Login