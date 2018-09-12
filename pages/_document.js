import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'

injectGlobal`
  html {
    font-size: 16px;
  }
  body {
    font-family: Lato, serif;
    font-size: 16px;
  }
  * {
    box-sizing: border-box;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, res }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    // var test = localStorage.getItem('token')
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>Front End</title>
          {this.props.styleTags}
          <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet" />
          <meta name="google-signin-scope" content="profile email" />
          <meta name="google-signin-client_id" content="1023874746413-mgm9p2cl704jkcfd7k6q7n8m5medn0sa.apps.googleusercontent.com" />
          <script src="https://apis.google.com/js/platform.js" async defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}