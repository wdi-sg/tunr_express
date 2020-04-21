var React = require("react");

class Register extends React.Component {
  render() {

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>Create Account</h1>
                <br/>
                <div className='row justify-content-center'>
                    <form method='POST' action='/register'>
                        <p>Username <input type='text' name='username' placeholder='Enter username'/></p>
                        <p>Password <input type='password' name='password' placeholder='Enter password'/></p>
                        <br/>
                        <div className='row justify-content-center'>
                            <input type='submit' className='btn btn-primary' value='Submit'/>
                        </div>
                    </form>
                </div>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-dark'><a href='/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Register;