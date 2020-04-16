var React = require('react');

class UpdatedArtists extends React.Component {

    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Artists</h1>
            <ul>
                <li>{this.props.id}</li>
                <li>{this.props.name}</li>
                <li>{this.props.photo_url}</li>
                <li>{this.props.nationality}</li>
            </ul>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = UpdatedArtists;