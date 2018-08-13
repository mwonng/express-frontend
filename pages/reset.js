import Panel from '../components/Panel'
import UserService from '../utils/UserService'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';
import withContainer from '../components/layouts/Container';
import FlashMessage from '../components/form-components/FlashMessage';
import withFlashMessage from '../components/layouts/withFlashMessage';


const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)
const UserAction = new UserService(ENDPOINT)

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

@withContainer
@withFlashMessage
class Reset extends React.Component {
  static async getInitialProps({ query }) {
    const token = query.token;
    return {token}
  }

  constructor(props) {
    super(props)
    this.state = {
      token: this.props.token,
      password: "",
      isLoading: true,
      isLogin: false,
      valid: true,
    }
    this.isMatched = this.isMatched.bind(this)
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    const {token} = this.props;
    Auth.resetPasswordTokenVerify(token)
    .then(response => {
      if (response.data.success) {
        this.setState({
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: true,
        });
        Router.push('/');
      }
    })
  }

  validatePassword(password) {
    var strongRegex = new RegExp("^(?=.*[0-9])(?=.{6,})");
    if (!strongRegex.test(password)) {
      () => this.setState({valid: false})
      return false
    }
    return true
  }

  isValidForNextSetp (){
    let isPass = this.validateConfirmPassword(this.state.passwordConfirm) && this.isMatched()
    if (!isPass) {
      return false
    }
    return isPass
  }

  validateConfirmPassword(passwordConfirm) {
    this.setState({ valid: this.isMatched()})
    return this.isMatched()
  }

  isMatched() {
    return this.state.password === this.state.passwordConfirm
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit = () => {
    let {token} = this.state
    if (this.isValidForNextSetp()) {
      console.log("update password ->",token)
      // UserAction.resetPassword(token)
    } else {
      this.setState({
        showFlashMessage: true,
        flashMessage: {
          type: 'error',
          message: 'Password not matched, please retry.'
        }
      })
    }
  }

  render() {
    const { showFlashMessage, flashMessage } = this.state;
    const { type, message } = this.state.flashMessage;

    if (this.state.isLoading) {
      return (
        <div> Loading ...</div>
      )
    }
    return (
      <div>
        <h1>Reset Password</h1>
        <Panel title="Sign up">
          {
            showFlashMessage &&
            <FlashMessage
              text={message}
              type={type}
              callback={this.flashMessageCallback}
            >{flashMessage.message}
            </FlashMessage>
          }
          <TextField
            class="password"
            disable={true}
            id="password"
            label="New password"
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
            validate={this.validatePassword}
            password
          />
          <TextField
            id="passwordConfirm"
            label="Confirm new password"
            class="password"
            disable={true}
            onChange={this.handleChange}
            onKeyPressEnter={this.handleSubmit}
            isMatch={this.state.password === this.state.passwordConfirm}
            password
          />
          <Button
            color="#5EBBB3"
            text="Reset your password"
            onClick={this.handleSubmit}
          />
        </Panel>
      </div>
    );
  }
}
export default Reset