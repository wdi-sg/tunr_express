var React = require("react");
var DefaultLayout = require('./layouts/default');
class newPlaylist extends React.Component {
  render() {
    return (
        <DefaultLayout>
        <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
<form className="mt-5" method="POST" action="/playlists">
  <div className="form-group">
  <h1>New Playlist</h1>
    <label htmlFor="name">Playlist name</label>
    <input type="text" className="form-control" name="name"/>
    </div>
     <div className="d-flex flex-row-reverse">
    <button type="submit" className="btn btn-primary btn-customized">Add</button>
    </div>
    </form>
    </div>
    </div>
    </div>
        </DefaultLayout>
    );
  }
}

module.exports = newPlaylist;