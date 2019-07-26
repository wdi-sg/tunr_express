var React = require("react");

class Home extends React.Component {
  render(){
  let artist = this.props.artists;
  let url = '/single';


    return (
      <html>
      <head>
      </head>
        <body>
          <div>
            <h2> {this.props.rows[0].name} </h2>
            <img src={this.props.rows[0].photo_url}/>
            <h2> {this.props.rows[0].nationality} </h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;