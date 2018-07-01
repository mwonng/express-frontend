import LoginForm from '../components/LoginForm'

class Login extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    console.log(token)
  }

  render() {
    return (
      <div>
        <h1>Welcome to login</h1>
        <LoginForm></LoginForm>

      </div>
    );
  }
}



export default Login