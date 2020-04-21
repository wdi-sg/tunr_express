var React = require("react");

class Welcome extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>Tunr</h1>
                <h5 className='text-center'>The world's #1 music catalog/ player</h5>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-primary'><a href='/login/' className='text-white text-decoration-none'>Login</a></button>
                </div>
                <br/>
                <div className='row justify-content-center'>
                    <p>New user? <a className='text-decoration-none' href='/register/'>Register here</a></p>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Welcome;