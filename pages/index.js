import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'
const FRONT_ENDPOINT = process.env.NODE_ENV === 'production'?process.env.FRONT_ENDPOINT:process.env.DEV_FRONT_ENDPOINT
const Auth = new AuthService(FRONT_ENDPOINT)
import Link from 'next/link'
import fetch from 'isomorphic-fetch';
import axios from 'axios'


axios.defaults.headers.common['Authorization'] = "LOOKINGATME!!";

class Index extends React.Component {
  static async getInitialProps({ req,res }) {
    return {}
  }

  componentDidMount() {
    const token = Auth.getToken()
    this.setState({token})
  }

  constructor(props) {
    super(props)
    this.state = {
      token: ""
    }
  }

  render() {
    return(
      <div>
        <p>Hello Next.jsx, time {this.props.host}</p>
        <p>State: {JSON.stringify(this.state)}</p>
        <p>token: {this.state.token}</p>
        <p>result: {this.state.result}</p>
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