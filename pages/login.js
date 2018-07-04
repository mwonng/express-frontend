import LoginForm from '../components/LoginForm'
import axios from 'axios';

class Login extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('id_token')
    console.log(token)
  }

  handleSubmit = (formObj) => {
    console.log("Hey, im in Login.js, not LoginFrom Component")
    axios.defaults.headers.common['Authorization'] = "LOOKINGATME!!";
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth',
      data: formObj
    })
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('express_frontend_token', response.data.token)
        console.log("response token:", response.data.token)
      } else {
        localStorage.setItem('express_frontend_token','n/a')
        console.log("failed")
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to login</h1>
        <LoginForm handleSubmit={this.handleSubmit} text="test text"></LoginForm>
      </div>
    );
  }
}

export default Login