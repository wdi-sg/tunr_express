var React = require("react");
var Template = require("./layout/template");

class Addsongs extends React.Component {
  render() {

    return (
      <Template title={this.props.title}>
      <div className="solo-artist">
          <form method="POST" action="/artist/:id/songs">
                <table className="table table-bordered">
                    <tr>
                        <th scope="row">Title</th>
                        <td><input type="text" name="title"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Album</th>
                        <td><input type="text" name="album"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Preview_Link</th>
                        <td><input type="text" name="preview_link"/></td>
                    </tr>
                    <tr>
                        <th scope="row">artwork</th>
                        <td><input type="text" name="artwork"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Artist_id</th>
                        <td><input type="text" name="artist_id"/></td>
                    </tr>
                </table>
                <input type="submit" value="Add" style={{display:"block",margin:"0 auto"}}/>
            </form>
      </div>

      </Template>
    );
  }
}

module.exports = Addsongs;
