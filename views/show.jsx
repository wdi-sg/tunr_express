var React = require('react');

class Show extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>

    return (
      <html>
        <body>
          <div>
            <h1>This is <span style={{ color: "#4DDDD0", fontWeight: "lighter"}}> {this.props.selectedArtist.name} </span></h1>
            <h3>Want to see a picture of the artist that you have just added? Here you go! </h3>
            <img src={this.props.selectedArtist.photo_url}/>
            <p>This artist is from {this.props.selectedArtist.nationality} </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;