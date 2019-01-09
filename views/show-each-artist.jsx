var React = require("react");

class ShowEachArtist extends React.Component {
  render() {
    console.log(this.props.artist);
    console.log(this.props.songs);

    const artistName = this.props.artist.map ((byArtist,index)=>{
        return <h1 key = {index}>By Artist: {byArtist.name}</h1>
    })

    const songsByArtist = this.props.songs.map ((bySongs, index)=>{
        return  <div key = {index}>
                <h3>Songs Title: {bySongs.title}</h3>
                <h3> Album: {bySongs.album}</h3>
                <img src={bySongs.artwork} alt="artwork"/>
                </div>
    })

    return (
      <html>
        <head />
        <body>
          {artistName}
          {songsByArtist}
        </body>
      </html>
    );
  }
}

module.exports = ShowEachArtist;