var React = require("react");

class Show extends React.Component {
  render() {
    console.log("INSIDE REACT INDEX", this.props.artist);
    return (
      <html>
        <head />
        <body>
          <div>
            <h1>Artist</h1>
                <h2 key = {this.props.artist[0].id}>
                  {this.props.artist[0].name}
                </h2>
                <h3 key = {this.props.artist[0].id}>
                  {this.props.artist[0].nationality}
                </h3>
                <img style = {{height: 300}} src = {this.props.artist[0].photo_url} key = {this.props.artist[0].id}/>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Show;
