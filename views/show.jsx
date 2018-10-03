var React = require("react");

class Show extends React.Component {

  render() {
console.log("this.props", this.props.artist[0]);
    return (

      <html>
        <head />
        <body>
          <h1>Artist found</h1>
            <ul> //use [0] to access the data
                <li>{this.props.artist[0].id} : {this.props.artist[0].name}</li>
                <img src={this.props.artist[0].photo_url} alt="" height="200"/>
                <li>{this.props.artist[0].nationality}</li>
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Show;
