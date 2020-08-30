var React = require("react");

class Show extends React.Component {
  render() {
    let {id, title, album, artwork, name=''} = this.props;
    return (
      <html>
        <head />
        <body>
          <h1>Show one</h1>
          <p>See a single song</p>
          { <p>{`${title}, ${album}, ${artwork}, `}{(name) ? name : 'unknown artist'}</p> }
        </body>
      </html>
    );
  }
}

module.exports = Show;