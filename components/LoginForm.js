import styled from 'styled-components'
import TextField from './form-components/TextField';
import Button from './form-components/Button';

const Panel = styled.div`
  margin: 0 auto;
  padding: 2rem;
  border: 1px #ccc solid;
  width: 50%;
`

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  submitLogin = () => {
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <div>
        <Panel>
          <h3>Panel</h3>
          <TextField
            id="email"
            label="Email"
            class="email"
            disable={true}
            onChange={this.handleChange}
          ></TextField>
          <TextField
            id="password"
            label="Password"
            class="password"
            disable={true}
            onChange={this.handleChange}
            onKeyPressEnter={this.submitLogin}
          ></TextField>
          <Button
            color="#0000cc"
            text="Submit"
            onClick={this.submitLogin}
          />
          { this.props.notification &&
            <b style={{color:"red"}}>Login Failed</b>
          }
        </Panel>
      </div>
    );
  }
}

export default LoginForm