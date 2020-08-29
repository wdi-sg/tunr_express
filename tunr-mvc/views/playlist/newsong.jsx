var React = require("react");

export default class Newsong extends React.Component {
  render() {
    let playlist_id = this.props.id
        return (
                <form method="POST" action="/playlist/newsong" >
    Song Name:  <input type="text" name="name" /> <br /> <br />
    Song ID:  <input type="text" name="id" /> <br /> <br />
    Playlist ID: <input type="text" name="playlist_id" defaultValue={playlist_id} readonly='readonly'/> <br /> <br />
                 <input type="submit" value="Submit" />
                </form>
                 );
  }
}

