var React = require("react");

class Home extends React.Component {
  render() {

    let artist = this.props.artists.map(iterator=>{

      let aTag = '/artists/'+iterator.id;

      let actionUrl = '/artists/'+iterator.id+'/edit';

      return (
        <div>
          <ul>
            <li>Name: <a href={aTag}>{iterator.name}</a></li>
            <li>Nationality: {iterator.nationality}</li>
            <p><img src={iterator.photo_url}/></p>
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
          <h1>ARTISTS HOME PAGE</h1>
          <form method="GET" action='/artists/new'>
            <button type="submit">New</button>
          </form>
          <div>
            {artist}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
