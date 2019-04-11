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

class Login extends React.Component {
    render(){
        return (<html>
            <Head/>
            <body>
                <div class="container">
                    <div class="row align-items-start justify-content-center p-4 m-4">
                        <div class="col-5">
                        <h1><strong>Mildly Comparable Audiophalse</strong></h1>
                        <h2 class="lead">Enter Login Details:</h2>
                        </div>
                    </div>
                    <div class="row align-items-center justify-content-end p-4 m-4">
                        <div class="col-6 ">
                        <form method="POST" action="/login">
                            <input name="username" placeholder="name" class="form-control" required/>
                            <input name="password" placeholder="password" class="form-control" required/>
                            <button type="submit" class="btn" aria-label="Left Align">
                            <span class="glyphicon glyphicon-record btn btn-primary glyphicon-align-left" aria-hidden="true"></span>
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </body>
        </html>);
    }
}

module.exports = Login;