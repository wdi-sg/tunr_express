var React = require("react");
var Default = require("./layout/default");

class Add extends React.Component {
  render() {
    let item = this.props.artists;
    let actionUrl = "/artist/"+item.id+"?_method=PUT"
    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <div className="solo-artist">
      <img className="artist-pic" src={item.photo_url}/>
        <form method="POST" action={actionUrl}>
            <table className="table table-bordered">
                <tr>
                    <th scope="row">Name</th>
                    <td><input type="text" name="name" value={item.name}/></td>
                </tr>
                <tr>
                    <th scope="row">Nationality</th>
                    <td><input type="text" name="nationality"value={item.nationality}/></td>
                </tr>
                <tr>
                    <th scope="row">Image URL</th>
                    <td><input type="text" name="photo_url"value={item.photo_url}/></td>
                </tr>
            </table>
            <input type="submit" value="Submit" style={{display:"block",margin:"0 auto"}}/>
        </form>
      </div>

      </Default>
    );
  }
}

module.exports = Add;
