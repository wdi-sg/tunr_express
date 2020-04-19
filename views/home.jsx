var React = require("react");

class Home extends React.Component {
  render() {
    const artists = this.props.artistsInformation.map(result =>{
        return (<div><p>{result.name}</p><p>{result.photo_url}</p><p>{result.nationality}</p></div>)
    })
    return (
      <html>
        <head />
        <body>
          <h1>Artist Information</h1>
          <p>{artists}</p>
        </body>
      </html>
    );
  }
}

module.exports = Home;
