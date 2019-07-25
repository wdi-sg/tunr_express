const React = require("react");

class Block extends React.Component {
  render() {

    let songs = this.props.songs;

    let optionArr = songs.map( song => {
        return (
              <option value={song.id}>{song.title}</option>
        )
    })

    return  <select name="song_id">
                {optionArr}
            </select>

  }
}

module.exports = Block;