var React = require("react");
var Default = require("./layout/default");

class Artist extends React.Component {
  render() {
    let item = this.props.artists;
    let editUrl = "/artist/"+item.id+"/edit";
    let deleteUrl = "/artist/"+item.id+"?_method=delete";
    let addSongUrl = "/artist/"+item.id+"/songs/new";
    return (
      <Default title={this.props.title}>
        <div className="solo-artist">
            <img className="artist-pic" src={item.photo_url}/>
            <table className="table table-bordered">
                <tr>
                    <th scope="row">Name</th>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <th scope="row">Nationality</th>
                    <td>{item.nationality}</td>
                </tr>
            </table>
            <div className="choices">
                <form action={editUrl}>
                    <input type="submit" value="Edit"/>
                </form>
                <form  action={addSongUrl}>
                    <input type="submit" value="Add New Song"/>
                </form>
                <form method="POST" action={deleteUrl}>
                    <input type="submit" value="Delete"/>
                </form>
            </div>


        </div>
      </Default>
    );
  }
}

module.exports = Artist;
