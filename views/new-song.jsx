var React = require("react");
var Layout = require("./layout");

class NewSong extends React.Component {
  render() {
    // console.log('props', this.props);
    let actionAttribute = `/artist/${this.props.id}/songs`
    //IS THERE any way for a input for to not allow for user to edit? I want to keep the artist_id intact
    return (
            <Layout title = "Add New Song">
            <form method = "POST" action = {actionAttribute}>
              <h4>Song Title:</h4>
              <input type= "text" name = "title" placeholder = "Song Title"/>
              <h4>Album Name: </h4>
              <input type= "text" name = "album" placeholder = "Album Name"/>
              <h4>Preview: </h4>
              <input type= "text" name = "preview_link" placeholder = "URL: preview link"/>
              <h4>Artwork: </h4>
              <input type= "text" name = "artwork" placeholder = "URL: Artwork"/>
              <br/>
              <input type= "submit" defaultValue= "Submit"/>
            </form>
          </Layout>);
  }
}

module.exports = NewSong;
