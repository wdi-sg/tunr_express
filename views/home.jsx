var React = require("react");



class Home extends React.Component {
  render() {

    const artists = this.props.ccb.map((artist) =>{
    return <div style={{float : 'left', width : '400px'}}>
            <p> Artist Name: {artist.name}</p>
            <p> Nationality: {artist.nationality} </p>
            <img src={artist.photo_url} style={{width: '300px'}}/>
            </div>
});

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          {artists}
        </body>
      </html>
    );
  }
}

module.exports = Home;