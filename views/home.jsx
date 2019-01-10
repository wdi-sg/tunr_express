var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Tuner</h1>
            <img src={this.props.artist.photo_url} width="20%" height="60%" />
            <br />
            <h2>
              Name: {this.props.artist.name} <br />
            </h2>
            <h2>Country: {this.props.artist.nationality}</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
