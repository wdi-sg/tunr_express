const React = require('react');
const Head = require('./head');

class filename extends React.Component {
  render() {
    console.log(this.props.artist);
    return (
      <html>
        {Head}

        <body>
          <div className="container text-center">
            <h4>{this.props.artist.name}</h4>
            <img src={this.props.artist.photo_url} />
            <p>From: {this.props.artist.nationality}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = filename;
