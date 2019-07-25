var React = require("react");
const uniqid = require('uniqid');

class Home extends React.Component {
  render() {
    console.log("Main page is running!");
    let array = this.props.artistsKey.map(artist => {
        return(
        <div style={{display: 'inline-block', color:'black', padding: '35px'}} key={uniqid()}>
            <img src={artist.photo_url} key={uniqid()} style={{display: 'block', height: '200px', width: '200px' }}/>
            <p key={uniqid()}>{artist.name}</p>
            <p key={uniqid()}>{artist.id}</p>
            <p key={uniqid()}>{artist.nationality}</p>
        </div>);
    });

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

module.exports = Home;
