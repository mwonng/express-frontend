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
    this.setState({
      showFlashMessage: true,
      currentMessage:{
        type: 'success',
        message: 'Show me the momeny111'
      }
    });
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
          { showFlashMessage &&
            <FlashMessage
              // text={message}
              // type={type}
              // duration='3000'
              callback={this.flashMessageCallback}
            >Children Text
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