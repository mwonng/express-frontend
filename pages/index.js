import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

const Auth = new AuthService('http://localhost:3001')
import Link from 'next/link'
import fetch from 'isomorphic-fetch';
import axios from 'axios'


axios.defaults.headers.common['Authorization'] = "LOOKINGATME!!";

class Index extends React.Component {
  static async getInitialProps({ req,res }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    // const host = req ? req.headers['host']: "no host"

    // res.setHeader('X-Author', 'Michael Wonng')
    // if (res) {
    //   res.writeHead(302, {
    //     Location: '/login'
    //   })
    //   res.end()
    //   res.finished = true
    // } else {
    //   Router.push('http://google.com')
    // }
    // Router.push('/login')
    return {}
  }

  componentDidMount() {
    // localStorage.setItem('token', 'THIS-IS')
    const token = Auth.getToken()
    this.setState({token}, ()=>{
      console.log(this.state)
    })
    console.log(".env", process.env.END_POINT );
    // axios({
    //   method: 'post',
    //   url: '/admin',
    //   data: {key: "value", authorization: "in body"}
    // })
  }

  constructor(props) {
    super(props)
    this.state = {token: ""}
  }

  render() {
    return(
      <div>
        <p>Hello Next.jsx, time {this.props.host}</p>
        <p>State:</p>
        <p>token: {this.state.token}</p>
        <p>
          Click{' '}
          <Link href="/login" replace>
            <a>here</a>
          </Link>{' '}
          to replace
        </p>
        <p>
          Click{' '}
          <Link href="/login">
            <a>here</a>
          </Link>{' '}
          to redirect more
        </p>
      </div>
    )
  }
}
export default Index