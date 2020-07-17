var React = require('react');

class SongItem extends React.Component {
  render() {

    return (

            <tr>
              <td>{this.props.data.title}</td>
              <td>{this.props.data.album}</td>
              <td>{this.props.data.artwork}</td>
            </tr>

    );
  }
}

module.exports = SongItem;
