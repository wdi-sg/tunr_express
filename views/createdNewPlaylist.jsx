var React = require('react');

class CreatedNewPlaylist extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
            let Capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1) };
    return (
      <html>
      <head>
          <title>
              {this.props.newArtist.name}
          </title>
      </head>
        <body>
          <div>
            <h1>Hey there, you've added <span style={{ color: "#4DDDD0", fontWeight: "lighter"}}> {Capitalize(this.props.newArtist.name)} </span> as you new playlist!</h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = CreatedNewPlaylist;