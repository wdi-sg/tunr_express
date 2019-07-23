var React = require("react");

class Add extends React.Component {
  render() {

    return (
      <Default title={this.props.title}>
      <div className="solo-artist">
          <form method="POST" action="/artist">
                <table className="table table-bordered">
                    <tr>
                        <th scope="row">Name</th>
                        <td><input type="text" name="name"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Nationality</th>
                        <td><input type="text" name="nationality"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Image URL</th>
                        <td><input type="text" name="photo_url"/></td>
                    </tr>
                </table>
                <input type="submit" value="Add" style={{display:"block",margin:"0 auto"}}/>
            </form>
      </div>

      </Default>
    );
  }
}

module.exports = Add;
