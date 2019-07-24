var React = require("react");
const uniqid = require('uniqid');

class Artist extends React.Component {
  render() {
    console.log("Main page is running!");
    let array =
        <div style={{display: 'inline-block', color:'black', padding: '35px'}} key={uniqid()}>
            <img src={this.props.photo_url} key={uniqid()} style={{display: 'block', height: '100px', width: '150px' }}/>
            <p key={uniqid()}>{this.props.name}</p>
            <p key={uniqid()}>{this.props.id}</p>
            <p key={uniqid()}>{this.props.nationality}</p>
        </div>;

    return (
        <html>
        <body>
        <h1>Tunr featured artists</h1>
        <div key={uniqid()}>{array}</div>
        </body>
        </html>
        );
  }
}

module.exports = Artist;