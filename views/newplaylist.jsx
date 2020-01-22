var React = require('react');

class Newplaylist extends React.Component {
  render() {
    return (
      <form method="POST" action="/playlist">
            Add a Playlist:
            <div>
            Name: 
            <input type="text" name="name"/>
            </div>
            <div>
            <input type="submit" value="Submit"/>
            </div>
        </form>
    )
  }
}

module.exports = Newplaylist;