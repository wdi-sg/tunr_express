const React = require("react");

class Block extends React.Component {
  render() {

    let artists = this.props.artists;

    let optionArr = artists.map( artist => {
        return (
              <option value={artist.id}>{artist.name}</option>
        )
    })

    return  <select name="artist_id" required>
                {optionArr}
            </select>

  }
}

module.exports = Block;