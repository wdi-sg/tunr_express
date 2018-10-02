var React = require("react");

class Show extends React.Component {
  render() {

    let song = this.props.songs.map(iterator=>{

      let actionUrl = '/songs/'+iterator.id+'/edit';

      return (
        <div>
          <ul>
            <li>Song title: {iterator.name}</li>
            <li>Album: {iterator.album}</li>
            <li>Preview link: {iterator.preview_link}</li>
            <p><img src={iterator.artwork}/></p>
            <form method="GET" action={actionUrl}>
              <input type="submit" value="Edit"/>
            </form>
          </ul>
        </div>
        );
    })
    return (
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/style.css"></link>
        </head>
        <body>
          <h1>SONGS LIST</h1>
          <form method="GET" action='/song/new'>
            <button type="submit">New</button>
          </form>
          <div>
            {song}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;
