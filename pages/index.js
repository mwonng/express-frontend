import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

const Auth = new AuthService('http://localhost:3001')
import Link from 'next/link'
import fetch from 'isomorphic-fetch';

class Index extends React.Component {
  static async getInitialProps({ req,res }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    const host = req ? req.headers['host']: "no host"

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
  }

  constructor(props) {
    super(props)
    // const token = Auth.getToken()
    this.state = {token: ""}
    fetch('https://api.github.com/users/mwonng/repos')
    .then( (res) => {
      if (res.status >= 400) {
        // throw new Error("Bad response from server");
        console.log("Bad response from server")
        Router.push('/login')
      }
      return res.json();
    })
    .then( (repos) => {
      // console.log(stories);
      this.setState({result:repos})
    })
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