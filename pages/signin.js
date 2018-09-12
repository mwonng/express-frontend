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
import styled from 'styled-components';
import GoogleLogin from '../components/GoogleLogin';

const ENDPOINT = process.env.NODE_ENV === 'production'?process.env.ENDPOINT:process.env.DEV_END_POINT
const Auth = new AuthService(ENDPOINT)

const GoogleLoginWrapper = styled.div`
  margin: 1rem 0;
  & > button {
    &:hover {
      cursor: pointer;
    }
  }
`

const addToLocalStorage = (key,token) => {
  localStorage.setItem(key, token)
  sessionStorage.setItem(key, token)
}

// const successResponseGoogle = async (response) => {
//   const {tokenId} = response
//   try {
//     const {data} = await Auth.verifyGoogleLogin(tokenId);
//     console.log("data->", data);
//   } catch (err) {
//     console.log("err->", err);
//     throw err
//   }
//   // need assign token and save into localStorage
// }

// const failResponseGoogle = (response) => {
//   console.log("fail login",response);
// }


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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static async getInitialProps ({ query }) {
    return {query:query}
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
      }
    })
    .catch(err=> {
      this.setState({
        showFlashMessage: true,
        flashMessage:{
          type: 'error',
          message: err,
        }
      });
    })
  }

  render() {
    const { showFlashMessage, flashMessage } = this.state;
    const { type, message } = this.state.flashMessage;
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
            <GoogleLogin />
          </Panel>
        </OneColumnMid>
      </div>
    );
  }
}

export default Login