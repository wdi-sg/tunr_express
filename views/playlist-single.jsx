var React = require("react");
const Layout = require("./layout");

class Single extends React.Component {
  render() {
    //   let editUrl = "/playlist/"+this.props.playlists.id+"/edit";
    //   let deleteUrl = "/playlist/"+this.props.playlists.id+"?_method=delete";
    return (
      <Layout>
          <div class="breadcrumb">
            <a href="/playlist/">All Playlists</a> - #{this.props.playlists.id}{this.props.playlists.name} 
          </div>
          <div class="artist">
            <h1>Playlist: {this.props.playlists.name} </h1>
            {/* <a href={editUrl}><div class="button-edit">Edit</div></a>
            <a href={deleteUrl}><div class="button-delete">Delete</div></a> */}
            Current songs:<br />
            <div class="button-new">Add New Songs</div>
          </div>
      </Layout>
    );
  }
}

module.exports = Single;
