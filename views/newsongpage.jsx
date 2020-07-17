var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
var Artistselect = require("./component/component-artist-select.jsx");

class Home extends React.Component {
  render() {
    //code goes here
    var artistList = this.props.artists.map((obj)=>{
      return <option value={obj.name}>{obj.name}</option>
    })

    var artistLink = "/artist/"+this.props.artist.id+"/songs"
    var newSong=
    <form action={artistLink} method="post">
    <label>Select which artist to submit new song under</label><br/>
    <select name="artist">
      <option></option>
      {artistList}
    </select><br/>
    <label>Song Title</label><br/>
    <input name="title" type="text" placeholder="song title"/><br/><br/>
    <label>Song Album</label><br/>
    <input name="album" type="text" placeholder="album name"/><br/><br/>
    <label>Preview Link</label><br/>
    <input name="preview_link" type="text" placeholder="song preview link"/><br/><br/>
    <label>Artwork</label><br/>
    <input name="artwork" type="text" placeholder="artwork for song"/><br/><br/>
    <input type="submit" value="Submit Song"/>
    </form>

    //user will put content in here. content will differ from page to page
    return (
      <Layout cookies={this.props.cookies}>
        <div id="artist-holding-page">
          New song for {this.props.artist.name}
          {newSong}

        </div>
      </Layout>
    );
  }
}

module.exports = Home;
