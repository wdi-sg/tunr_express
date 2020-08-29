var React = require("react");

class Show extends React.Component {
  render() {
    // let {id, name, photo_url, nationality} = this.props;
    return (
      <html>
        <head />
        <body>
          <h1>Show all</h1>
          <p>See a single artist</p>
          {/* <p>{`${name}, ${photo_url}, ${nationality}`}</p> */}
        </body>
      </html>
    );
  }
}

module.exports = Show;