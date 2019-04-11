var React = require("react");

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

class Navigation extends React.Component{
    render(){
        return(
            <nav>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a method="GET" href="/new"><span class=" glyphicon glyphicon-plus" aria-hidden="true"></span>Add New Artist to List</a>
                    </li>
                    <li class="nav-item">
                    <a method="GET" href="/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>Return to view all artist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class EditArtistForm extends React.Component{
    render(){
            let data = this.props.data.data[0];
            let formAction = '/artist/' + data.id + '?_method=PUT';

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label >Name: </label>
                            <input type="text" name="name" class="form-control" value={`${data.name}`} required/>
                        </div>
                        <div class="col-md-4 mb-3 ml-5">
                            <label>Photo Url: </label>
                            <input type="text" name="photo_url" class="form-control" value={`${data.photo_url}`} required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Nationality: </label>
                            <input type="text" name="nationality" class="form-control" value={`${data.nationality}`} required/>
                        </div>
                    </div>
                    <input type="submit" value="Submit Artist"  class="btn btn-primary"/>
                </form>
            </html>
        )
    }
}


class Edit extends React.Component {
  render() {

    let data = this.props;

    return (
      <html>
        <Head/>
        <body>
            <Navigation/>

          <h1>Mildly Comparable Audiophalse</h1>
          <br></br>
          <h3>Edit Artist</h3>
          <div class="content">
            <EditArtistForm data={data}/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;