var React = require("react");

//Using string and literals in react.

class AllPlaylists extends React.Component {
  render() {

    let list = this.props.allPlaylists.map(playlist => {
      return <li>{playlist.name}</li>
    })

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        </head>
          <body>
            <ul>
              {list}
            </ul>
          </body>
      </html>
    );
  }
}

module.exports = AllPlaylists;