var React = require("react");

class Artisteach extends React.Component {
  render() {


    console.log("this props", this.props);


    return (
      <html>
        <head />
        <body>
          <h1>{this.props.artist[0].name}</h1>
          <div><img src={this.props.artist[0].photo_url}/></div>
          <p>Country: {this.props.artist[0].nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artisteach;
