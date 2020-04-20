var React = require("react");
var DefaultLayout = require('./layouts/default');
class playlistsPage extends React.Component {
  render() {
       //  let formUrl= "/artists/"+this.props.id+"?_method=delete";
     let linkAdd= "/playlists/"+this.props.id+"/newsong";
          let songs = this.props.songs;
          console.log(songs);
    const listSongs = songs.map((song)=>{

       return (<div className="card m-5" style={{width: "20rem"}}>
  <div className="card-body d-flex flex-column justify-content-between">
    <h4 className="card-title">Title : {song.title}</h4>
    <h5 className="card-text">Album: {song.album}</h5>
    <h5 className="card-text">Preview: {song.preview_link}</h5>
    <h5 className="card-text">Artwork: {song.artwork}</h5>
  </div></div>)});
    return (
        <DefaultLayout>
        <div className="container h-100">

    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 ml-5 ">
        <div className="row">
                <h1>{this.props.name}</h1>
                </div>
                <div className="row">
                {listSongs}
                </div>
                <div className="d-flex flex-row-reverse">
               <a className="btn btn-primary mr-1" href={linkAdd}>Add</a>
        </div>
    </div>
</div>
</div>
        </DefaultLayout>
    );
  }
}

module.exports = playlistsPage;