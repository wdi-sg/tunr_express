var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
var Artistsongs = require("./component/component-artist-songs.jsx");

class Home extends React.Component {
  render() {
    //code goes here
    console.log(this.props.artists)
    var artistSongs = this.props.artists.map((obj)=>{
      return <Artistsongs artist_id={obj.artist_id} title={obj.title} album={obj.album} preview_link={obj.preview_link} artwork={obj.artwork}></Artistsongs>
    });
    var artistLink = "/artist/"+this.props.artistid+"/edit"
    var editForm=
    <form action={artistLink} method="get">
    <input type="submit" value="Edit artist"/>
    </form>
    var artistDeleteLink = "/artist/"+this.props.artistid+"?_method=DELETE"
    var deleteArtist=
    <form action={artistDeleteLink} method="post">
    <input type="submit" value="Delete artist"/>
    </form>

    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {this.props.artistname}
          {editForm}
          {deleteArtist}
          {artistSongs}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;
