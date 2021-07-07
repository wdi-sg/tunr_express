var React = require('react');

class Head extends React.Component{
    render(){
        return(
            <head>
                <meta charSet="utf-8"/>
                <title>TUNR EXPRESS</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/style.css"/>
            </head>
        )
    }
}

class Register extends React.Component {
    render(){
        return (<html>
            <Head/>
            <body>
                <div class="container">
                    <div class="row align-items-start justify-content-center p-4 m-4">
                        <div class="col-5">
                        <h1>Mildly Comparable Audiophalse</h1>
                        <h3>Register an Account</h3>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-end p-4 m-4">
                        <div class="col-6 ">
                        <form method="POST" action="/register">
                            <input name="username" placeholder="name" class="form-control" required/>
                            <input id="password" name="password" placeholder="password" class="form-control" required/>
                            <button type="submit" class="btn" aria-label="Left Align">
                            <span class="glyphicon glyphicon-record btn btn-danger glyphicon-align-left" aria-hidden="true"></span>
                            </button>
                        </form>
                        </div>
                    </div>
                    <ul class="row align-items-start justify-content-center p-4 m-4">
                        <li class="col-5">
                        <a method="GET" href="/login"><span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>Have an Account? Login Here!</a>
                        </li>
                    </ul>
                </div>
            </body>
        </html>);
    }
}

module.exports = Register;