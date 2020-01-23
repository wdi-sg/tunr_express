var React = require("react");

class Playlist extends React.Component {
  render() {
    let listName = this.props.name;
    const listItem = listName.map( list => {
        return <li>{list.name}</li>
    });
    return (
    <html>
        <head>
        <title>Playlists</title>
        </head>
        <body>
           <h3>Playlists</h3>
            <div>
                <ol>
                {listItem}
                </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
