var React = require("react");

class Artistadded extends React.Component {
  render() {


    console.log("this props", this.props);


    return (
      <html>
        <head />
        <body>
          <h1>{this.props.artist.name}</h1>
          <div><img src={this.props.artist.photo_url}/></div>
          <p>Country: {this.props.artist.nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artistadded;
