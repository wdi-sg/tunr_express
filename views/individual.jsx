var React = require('react');
class Individual extends React.Component {
    render() {
        return (
            <html>
              <body>
                <div>
                <h2>Artist #{this.props.id}</h2>
                <h1>{this.props.name}</h1>
                <div><img src={this.props.photo_url} alt="artist image"/></div>
                <h3>Nationality:{this.props.nationality}</h3>
                </div>
              </body>
            </html>
          );
    }
}

module.exports = Individual;