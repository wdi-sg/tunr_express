var React = require("react");
var DefaultLayout = require('./layouts/default');
class listPlaylist extends React.Component {
  render() {
    let playlists = this.props.playlists;
    const listPlaylist = playlists.map((playlist)=>{
        let link  = "/playlists/"+playlist.id;
       return (<div className="card m-5" style={{width: "20rem"}}>
  <div className="card-body d-flex flex-column justify-content-between">
    <h4 className="card-title"><a href={link}>{playlist.name}</a></h4>
  </div></div>);
    })
    return (
        <DefaultLayout>
      <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 text-center">
        <h1>Playlist</h1>
        </div>
        </div>
 <div className="row">
          {listPlaylist}
                  </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = listPlaylist;