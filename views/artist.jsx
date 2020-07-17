var React = require("react");
var Template = require("./layout/template");

class Artist extends React.Component {
  render() {
    let item = this.props.artists;
    let editUrl = "/artist/"+item.id+"/edit";
    let deleteUrl = "/artist/"+item.id+"?_method=delete";
    return (
      <Template title={this.props.title}>
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
                <form method="POST" action={deleteUrl}>
                    <input type="submit" value="Delete"/>
                </form>
            </div>


        </div>
      </Template>
    );
  }
}

module.exports = Artist;
