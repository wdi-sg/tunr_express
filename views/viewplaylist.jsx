var React = require('react');

var Layout = require('./layout')

class ViewPlaylist extends React.Component {
  render() {
    let id = "/playlists/"+this.props.id+"?_method=delete";
    let editLink = "/playlists/"+this.props.id+"/edit";
    let songLink = "/playlists/"+this.props.id+"/songs";
    let addSong = "/playlists/"+this.props.id+"/newsong";

    let songLists = this.props.songs.map((song)=>{
        let songTitle = song.title;

        return (
            <li>
            {songTitle}
            </li>
            )
        });

    return (
        <Layout>
          <div className="container">
          <h1>This is {this.props.name}</h1>
          <div className="row d-flex">
          <div className="col-md-4">
            <img src="https://upload.wikimedia.org/wikipedia/en/2/23/PENTAGON_Demo_01.jpg" className="img-fluid" alt="photo"/>
          </div>
          <div className="col-md-8">
            <div>
            <h5>Name: </h5>
            <p>{this.props.name}</p>
            </div>

            <div>
            <h5>Songs: </h5>
            <ul>
            {songLists}
            </ul>
            </div>

            <div>
            <a href="/playlists" className="btn btn-primary">Back</a>
            <a href={addSong} className="btn btn-success ml-4">Add Song!</a>
            <a href={editLink} className="btn btn-warning ml-4">Edit</a>
            <a href="#myModal" className="trigger-btn btn btn-danger btn-customized ml-4" data-toggle="modal">Delete
            </a>

            </div>
            </div>
          </div>

    <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="icon-box">
                    <i className="material-icons">&#xE5CD;</i>
                    </div>
                    <h4 className="modal-title">Are you sure?</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
        <div className="modal-body">
            <p>Do you really want to delete these records? This process cannot be undone.</p>
        </div>
            <div className="modal-footer">
            <form method="POST" action={id}>
            <button type="button" className="btn btn-info" data-dismiss="modal">Cancel</button>
            <button type="button" type="submit" className="btn btn-danger">Delete</button>
            </form>
            </div>
        </div>
    </div>
</div>

          </div>
      </Layout>
    );
  }
}

module.exports = ViewPlaylist;