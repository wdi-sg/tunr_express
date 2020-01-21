var React = require("react");
var DefaultLayout = require('./layouts/default');
class artistSongs extends React.Component {
  render() {
    let songs = this.props.songs;
    const listSongs = songs.map((song)=>{
    return(<div className="card m-5" style={{width: "20rem"}}>
  <div className="card-body d-flex flex-column justify-content-between">
    <h4 className="card-title">{song.title}</h4>
  </div></div>);
    });
    return (
        <DefaultLayout>
      <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 text-center">
        <h1>List Of Songs</h1>
        </div>
        </div>
 <div className="row">
          {listSongs}
                  </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = artistSongs;