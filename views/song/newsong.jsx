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

class NewSongForm extends React.Component{
    render(){
            let artistId = this.props.data.data;

            let formAction = `/artist/${artistId}/songs`;

        return(
            <html>
                <form method="POST" action={formAction}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label >Song Title: </label>
                            <input type="text" name="title" class="form-control" placeholder="Song Title" required/>
                        </div>
                        <div class="col-md-4 mb-3 ml-5">
                            <label>Album Name: </label>
                            <input type="text" name="album" class="form-control" placeholder="Album Name" required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Audio Link: </label>
                            <input type="text" name="preview_link" class="form-control" placeholder="mp3, youtube links" required/>
                        </div>
                    </div>
                    <div class="form-row">
                    <div class="col-md-4 mb-3">
                            <label >Artwork Link: </label>
                            <input type="text" name="artwork" class="form-control" placeholder="Song Title" required/>
                        </div>
                        <div class="col-md-1 invisible">
                            <label>Artist ID: </label>
                            <input type="text" name="artist_id" class="form-control" value={artistId} required/>
                        </div>
                    </div>
                    <input type="submit" value="Submit Artist"  class="btn btn-primary"/>
                </form>
            </html>
        )
    }
}

class NewSong extends React.Component {
  render() {
    let data = this.props;
    return (
      <html>
        <Head/>
        <body>
            <Navigation/>

          <h1>Mildly Comparable Audiophalse</h1>
          <br></br>
          <h3>Add New Song</h3>
          <div class="content">
            <NewSongForm data= {data}/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;