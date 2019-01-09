var React = require("react");
// Form for editing and deleting artist
class DisplaySingleArtist extends React.Component {
  render() {

        console.log("this.props.artists", this.props.artists[0].name);
        let artists = this.props.artists[0];
    return (

          <div>

            <button><a href={"/artists/"+artists.id+"/edit"} style={{textDecoration: "none", color: "grey"}}>Edit artist</a></button>

             <button><a href={"/artist/"+artists.id+"/delete"} style={{textDecoration: "none", color: "grey"}}>Delete artist</a></button>

            <h1> Artist ID {artists.id} </h1>
            <h2> Artist Name {artists.name} </h2>
            <h2> Artist Nationality {artists.nationality} </h2>
            <img src = {artists.photo_url}/>
          </div>

    );
  }
}

module.exports = DisplaySingleArtist;
