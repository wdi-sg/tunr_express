var React = require("react");

class New extends React.Component {
  render() {

        const songs = this.props.ccb.map((song) =>{
    return <div>
    <p> {song.album} </p>
    <p> {song.title} </p>
    </div>
});

    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <p> HELLO </p>
          {songs}
        </body>
      </html>
    );
  }
}

module.exports = New;