var React = require("react");
// Form for editing and deleting artist

// Form to add Songs and link
class DisplaySingleArtist extends React.Component {
  render() {

        //console.log("this.props.artists", this.props.songs[0].name);
        //let artists = this.props.artists[0];
        let songs = this.props.songs[0];
    return (

          <div>
            <button><a href={"/artists/"+songs.artist_id+"/songs"} style={{textDecoration: "none", color: "grey"}}>Add Song to artist</a></button>
                <h1> Viewing All Songs By Artist: {songs.artist_id}</h1>
                <h2> Songs ID: {songs.id} </h2>
                <h2> Title: {songs.title} </h2>
                <h2> Album: {songs.album} </h2>
                <img src = {songs.preview_link}/>
                <img src = {songs.artwork}/>
          </div>

    );
  }
}

module.exports = DisplaySingleArtist;
