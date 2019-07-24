var React = require("react");
var Default = require("./layout/default");

class New_Playlist extends React.Component {
  render() {

    return (
      <Default title={this.props.title}>
      <div className="solo-artist">
          <form method="POST" action="/playlist">
                <table className="table table-bordered">
                    <tr>
                        <th scope="row">Playlist Name</th>
                        <td><input type="text" name="name"/></td>
                    </tr>

                </table>
                <input type="submit" value="Add Playlist" style={{display:"block",margin:"0 auto"}}/>
            </form>
      </div>

      </Default>
    );
  }
}

module.exports = New_Playlist;
