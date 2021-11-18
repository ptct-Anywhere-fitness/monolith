import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          /> */}

          {/* <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
            integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
            crossOrigin='anonymous'
          /> */}

          {/* <script type='text/javascript' src='/hello.js' defer></script> */}
        </Head>
        <body>
          <Main />
          <div id='backdrop-hook'></div>
          <div id='notification-hook'></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
