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
                    <li class="nav-item">
                        <a method="GET" href="/new"><span class=" glyphicon glyphicon-plus" aria-hidden="true"></span>Add New Artist to List</a>
                    </li>
                    <li class="nav-item">
                        <a method="GET" href="/playlist"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>View Playlist</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

class Songs extends React.Component {
  render() {

    // console.log(this.props.data);
    let songElements = this.props.data.map((o) => {
        return <li><label><input type="checkbox" name="songs" value={ o.id }/> { o.title }, { o.album }</label></li>
    });


    return (
        <ul>
            {songElements}
        </ul>
    );
  }
}

class NewPlayListForm extends React.Component{
    render(){

            let formAction = '/playlist';

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                           Playlist Name:  <input type="text" name="title" class="form-control" placeholder="Name your Playlist" required/>
                            Songs: <Songs data={this.props.data}/><br/>
                        </div>
                    </div>
                    <input type="submit" value="Create New Playlist"  class="btn btn-primary"/>
                </form>
            </html>
        )
    }
}

class NewPlayList extends React.Component {
  render() {


    return (
      <html>
        <Head/>
        <body>
            <Navigation/>

          <h1>Mildly Comparable Audiophalse</h1>
          <br></br>
          <h3>NEW PLAYLIST</h3>
          <div class="content">
            <NewPlayListForm data={this.props.data}/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlayList;