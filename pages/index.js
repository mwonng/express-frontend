import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'
const FRONT_ENDPOINT = process.env.NODE_ENV === 'production'?process.env.FRONT_ENDPOINT:process.env.DEV_FRONT_ENDPOINT
const Auth = new AuthService(FRONT_ENDPOINT)
import Link from 'next/link'
import withContainer from '../components/layouts/Container';
import Head from 'next/head';

@withContainer
class Index extends React.Component {
  static async getInitialProps({ req,res }) {
    // grab some data from here
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
        <Head>
          <title>Weyou Login</title>
        </Head>
        <h1>Homepage</h1>
        <p>Hello World</p>
        <div>
          <span>Already have account and </span>
          <Link href="/signin">
            <a> Sign in</a>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <a>Create a new account</a>
          </Link>
        </div>
        <p></p>
      </div>
    )
  }
}


function testable (target) {
  console.log('testable...');
}

export default Index