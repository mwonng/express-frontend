import React from 'react'
import Router from 'next/router'

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
    return {}
  }

  componentDidMount() {
    localStorage.setItem('token', 'THIS-IS')
  }

  render() {
    console.log(this.props.req)
    return(
      <div>
        <p>Hello Next.jsx {this.props.host}</p>
      </div>
    )
  }
}
export default Index