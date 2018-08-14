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

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
}

const Auth = new AuthService()

@withContainer
@withFlashMessage
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
    }
    this.hideErr = this.hideErr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static async getInitialProps ({ query }) {
    return {query:query}
  }

  componentDidMount() {
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
    let {email} = this.state;
    Auth.forgetPassword(email)
    .then(response => {
      if (response.data.success) {
        addToLocalStorage(process.env.TOKEN_KEY, response.data.token)
        // addToLocalStorage('currentUserId', response.data.currentUser._id)
        // this can be dashboard or any permitted page
        this.setState({
          showFlashMessage: true,
          flashMessage:{
            type: 'success',
            message: response.data.msg
          }
        });
        // Router.push('/admin')
      } else {
        localStorage.setItem(process.env.TOKEN_KEY,'n/a')
        // localStorage.removeItem('currentUserId')
        // notification for error
        this.setState({
          showFlashMessage: true,
          flashMessage:{
            type: 'error',
            message: response.data.msg
          }
        });
        this.showErrorMsg(response.data.msg)
      }
    })
  }

  render() {
    const { showFlashMessage } = this.state;
    const { type, message } = this.state.flashMessage;
    return (
      <div>
        <OneColumnMid>
          <h1>Forget your password?</h1>
          <Panel title="Sign In" >
            { showFlashMessage &&
              <FlashMessage
                text={message}
                type={type}
                callback={this.flashMessageCallback}
              >{message}
              </FlashMessage>
            }
            <TextField
              id="email"
              label="Your email"
              class="email"
              disable={true}
              onChange={this.handleChange}
              onFocus={this.hideErr}
            />
            <Button
              color="#5EBBB3"
              text="Reset your password"
              onClick={this.handleSubmit}
            />
            <div>
              <Link href="/signup">
                <a>Create new account</a>
              </Link>
            </div>
            <div>
              <Link href="/signin">
                <a>Already have one</a>
              </Link>
            </div>
          </Panel>
        </OneColumnMid>
      </div>
    );
  }
}

export default ForgetPassword