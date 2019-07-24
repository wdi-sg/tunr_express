var React = require("react");
var Default = require("./layout/default");

class Add extends React.Component {
  render() {
    let url = '/artist/'+this.props.id+'/songs'
    return (
      <Default title={this.props.title}>
      <div className="solo-artist">
          <form method="POST" action={url}>
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
                        <th scope="row">Preview Link</th>
                        <td><input type="text" name="preview_link"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Artwork</th>
                        <td><input type="text" name="artwork"/></td>
                    </tr>
                    <input type="text" name="artist_id" value={this.props.id}hidden/>
                </table>
                <input type="submit" value="Add" style={{display:"block",margin:"0 auto"}}/>
            </form>
      </div>

      </Default>
    );
  }
}

module.exports = Add;
