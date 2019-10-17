var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
        </head>
        <body>
         <main class="form-row" style={{ margin: '50px auto',  width: '500px', fontFamily: 'Montserrat'}} >
        <h3 class="text-center" style={{width: '500px'}}>Add New Playlist: </h3><br/>

          <form method="post" action="/playlist" style={{width: '500px'}} ><br/><br/>
            Playlist Name: <input type="text" name="playlistName" style={{width: '500px'}} /><br/><br/>
            Song: <input type="text" name="song" style={{width: '500px'}} /><br/><br/>

            <input type="submit" value="Submit" class="btn btn-primary btn-block" style={{width: '500px'}} />
          </form>

          </main>
          </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;