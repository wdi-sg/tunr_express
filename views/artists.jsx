var React = require("react");

class Artists extends React.Component {
  render() {
    let artistInfo = this.props.rows;
    
    let artist = artistInfo.map(info => {
      return <div>
        <h2>{info.id}. {info.name}</h2>
        <img src={info.photo_url} alt="artist" width="250"/>
        <div>Nationality: {info.nationality}</div>
      </div>
    })
    // console.log(artistInfo);

    return (
      <html>
        <head />
        <body>
          <div>
            <div>{artist}</div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
