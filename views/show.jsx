var React = require("react");

class Show extends React.Component {
  render() {



    return (
      <html>
        <body>
            <h1>{this.props.artists.id} {this.props.artists.name}</h1>
            <img src={this.props.artists.photo_url}/>
            <p>Nationality: {this.props.artists.nationality}</p>
        </body>
      </html>
    );

  }
}

module.exports = Show;