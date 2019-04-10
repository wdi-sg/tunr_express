var React = require("react");

class Show extends React.Component {
  render() {



    return (
      <html>
        <body>
            <h1>{this.props.artists[0].id} {this.props.artists[0].name}</h1>
            <img src={this.props.artists[0].photo_url}/>
            <p>Nationality: {this.props.artists[0].nationality}</p>
        </body>
      </html>
    );

  }
}

module.exports = Show;