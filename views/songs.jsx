var React = require('react');
var Layout = require("./layout");
var Sound = require('react-sound');

// class Sound extends React.Component{
//   render(){
//     let allArtistPlaySongsArray = this.props.artistId.map(songItem=>{
//        let preview_sound = (songItem.preview_link).replace(/\'/g, "");
//     })
//     return (
//         <div>
//           <Sound
//             url ="preview_sound"
//             playStatus={Sound.status.PLAYING}
//             playFromPosition={300 /* in milliseconds */}
//             onLoading={this.handleSongLoading}
//             onPlaying={this.handleSongPlaying}
//             onFinishedPlaying={this.handleSongFinishedPlaying}
//           />
//         </div>
//     )
//   }
// }
// {allArtistPlaySongsArray}

class Songs extends React.Component {

  render() {
    let allArtistSongsArr = this.props.artistId.map(songItem=>{
      let id = parseInt(songItem.id);
      let title = songItem.title;
      let album = songItem.album; //this is a string, how to remove the quotes?
      let preview_link = (songItem.preview_link).replace(/\'/g, "");
      let artwork = (songItem.artwork).replace(/\'/g, "");
      let artist_id = parseInt(songItem.artist_id);
        return(
          // <li>{id} {num} {name}</li>
          <div className="card" styleName ={"width: 18rem;"}>
          <img className ="card-img-top" src = {artwork} alt= "Album's image"/>
            <div className = "card-body">
            <a href={preview_link}>
              <h4 className = "card-title">{title}</h4>
              </a>
            <h5>Album: {album}</h5>
            </div>
          </div>
        )
    });



    return(
      <Layout>
        <div>
          {allArtistSongsArr}

        </div>
      </Layout>
    );
  }
}

module.exports = Songs;
