var React = require("react");

class Head extends React.Component{
    render(){
        return(
            <head>
                <meta charSet="utf-8"/>
                <title>TUNR EXPRESS: Add New Artist</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/style.css"/>
            </head>
        )
    }
}

class Navigation extends React.Component{
    render(){
        return(
            <nav>
                <ul class="nav flex-column">
                    <li class="nav-item">
                    <a method="GET" href="/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Return to view all artist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class NewArtistForm extends React.Component{
    render(){

            let formAction = '/new/artistadded';

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label >Name: </label>
                            <input type="text" name="name" class="form-control" placeholder="Artist name" required/>
                        </div>
                        <div class="col-md-4 mb-3 ml-5">
                            <label>Photo Url: </label>
                            <input type="text" name="photo_url" class="form-control" placeholder="Copy & Paste artist photo link!" required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Nationality: </label>
                            <input type="text" name="nationality" class="form-control"  required/>
                        </div>
                    </div>
                    <input type="submit" value="Submit Artist"  class="btn btn-primary"/>
                </form>
            </html>
        )
    }
}

class New extends React.Component {
  render() {
    return (
      <html>
        <Head/>
        <body>
            <Navigation/>

          <h1>Mildly Comparable Audiophalse</h1>
          <br></br>
          <h3>Add New Artist</h3>
          <div class="content">
            <NewArtistForm/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;