var React = require("react");

class Info extends React.Component {
  render() {
    return (
      <html>
        <title>{this.props.name}</title>
        <head/>
        <body>
          <h3>{this.props.name}</h3>
            <div>
                <div>
                    <p> Artist </p>
                    <p>{this.props.name}</p>
                </div>
                <div>
                    <p> Photo </p>
                    <div> <img src = {this.props.photo_url}/> </div>
                </div>
                <div>
                    <p> Nationality </p>
                    <p>{this.props.nationality}</p>
                </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Info;
