var React = require('react');
class Show extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.warning }
            <h1>Name: { this.props.name }</h1>
            <h2>Nationality: { this.props.nationality }</h2>
            <img src={ this.props.photo_url } width="250px"/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;