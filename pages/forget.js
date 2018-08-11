import Panel from '../components/Panel'
import AuthService from '../utils/AuthService'
import Router from 'next/router'
import TextField from '../components/form-components/TextField';
import Button from '../components/form-components/Button';
import FlashMessage from '../components/form-components/FlashMessage';
import Link from 'next/link'
import withContainer from '../components/layouts/Container'
import withFlashMessage from '../components/layouts/withFlashMessage'

const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

@withContainer
@withFlashMessage
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      currentMessage: {
      },
      showFlashMessage: false
    }
    this.notifyEnd = this.notifyEnd.bind(this)
    this.hideErr = this.hideErr.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps ({ query }) {
    return {query:query}
  }

  componentDidMount() {
    console.log("decorator ->", this.showFlashMessage)
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

  notifyEnd() {
    this.setState({
      showFlashMessage: false
    });
  }

  handleSubmit = () => {
    let {email} = this.state
    this.setState({
      currentMessage:{
        type: 'success',
        message: 'Show me the momeny'
      },
      showFlashMessage: true
    });
    console.log(this.state.currentMessage);

    // Auth.login(formObj.email, formObj.password)
    // .then(response => {
    //   if (response.data.success) {
    //     addToLocalStorage(process.env.TOKEN_KEY, response.data.token)
    //     // addToLocalStorage('currentUserId', response.data.currentUser._id)
    //     // this can be dashboard or any permitted page
    //     Router.push('/admin')
    //   } else {
    //     localStorage.setItem(process.env.TOKEN_KEY,'n/a')
    //     // localStorage.removeItem('currentUserId')
    //     // notification for error
    //     this.showErrorMsg(response.data.msg)
    //   }
    // })
  }

  render() {
    const { showFlashMessage } = this.state;
    const { type, message } = this.state.currentMessage;
    return (
      <div>
        <h1>Forget your password?</h1>
        <Panel title="Sign In" >
          {showFlashMessage && <FlashMessage
            text={message}
            type={type}
            duration='3000'
            onShown={this.state.currentMessage.visible}
            callback={this.notifyEnd}
          />}
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
          { this.state.loginResult &&
            <div>
              <b style={{color:"red"}}>{this.state.loginResult}</b>
            </div>
          }
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
      </div>
    );
  }
}

export default ForgetPassword