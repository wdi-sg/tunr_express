var React = require("react");
// Form for editing and deleting artist
class DisplaySingleArtist extends React.Component {
  render() {

        console.log("this.props.artists", this.props.artists[0].name);
        let artists = this.props.artists[0];
    return (

          <div>

            <button><a href={"/artists/"+artists.id+"/edit"} style={{textDecoration: "none", color: "grey"}}>Edit artist</a></button>

             <button><a href={"/artists/"+artists.id+"/delete"} style={{textDecoration: "none", color: "grey"}}>Delete artist</a></button>

                <h1> View Single Artist </h1>
                <h2> Artist ID: {artists.id} </h2>
                <h2> Artist Name: {artists.name} </h2>
                <h2> Artist Nationality:{artists.nationality} </h2>
                <img src = {artists.photo_url}/>


             <button><a href={"/artists/"+artists.id+"/songs"} style={{textDecoration: "none", color: "grey"}}>Display artist Songs</a></button>
          </div>

    );
  }
}

module.exports = DisplaySingleArtist;
