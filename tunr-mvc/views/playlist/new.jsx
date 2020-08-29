var React = require("react");

export default class Newplaylist extends React.Component {
  render() {
        return (
                <form method="POST" action="/playlist" >
    Playlist Name:  <input type="text" name="name" /> <br /> <br />
                 <input type="submit" value="Submit" />
                </form>
                 );
  }
}

