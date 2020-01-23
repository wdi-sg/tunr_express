var React = require("react");
var DefaultLayout = require('./layouts/default');
class NewFavorites extends React.Component {
  render() {
     let songs = this.props.songs;
    const listSongs = songs.map((song)=>{
  return <option value={song.id}>{song.title}</option>;
});

    return (
        <DefaultLayout>
        <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 ml-5 ">
        <div className="row">
                <h1>Favorites</h1>
                </div>
                <form className="mt-5" method="POST" action='/favorites'>
                <div className="row">
                <select name="songs">
                    {listSongs}
                </select>
                </div>
                <br/>
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

module.exports = NewFavorites;