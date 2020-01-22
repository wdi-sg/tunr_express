var React = require("react");

var Layout = require('./layout');

class HomePlaylist extends React.Component {
  render() {
    let artistsList = this.props.playlist.map((playlist)=>{
        let linkView = "/playlists/" + playlist.id;
        let linkEdit = "/playlists/" + playlist.id + "/edit";

        return (
        <div className="col col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card" style={{width: "18rem"}}>
            <img src="https://upload.wikimedia.org/wikipedia/en/2/23/PENTAGON_Demo_01.jpg" className="img-fluid" alt="photo"/>
                <div className="card-body">
                <h5 className="card-title">{playlist.name}</h5>
                <a href={linkView} className="btn btn-primary">View</a>
                </div>
            </div>
        </div>
        )
    });
    return (
<Layout>
        <h1>Playlists</h1>
            <div className="row">
                {artistsList}
            </div>
</Layout>
    );
  }
}

module.exports = HomePlaylist;