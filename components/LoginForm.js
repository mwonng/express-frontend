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
    // console.log(event.target)
    this.setState({[event.target.id]: event.target.value})
  }

  postData = () => {
    console.log(this.state)
    console.log(this.props.text)
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <Panel>
          <p>Panel</p>
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
          ></TextField>
          <Button
            color="#0000cc"
            text="Submit"
            onClick={this.postData}
          />
        </Panel>
      </div>
    );
  }
}

export default LoginForm