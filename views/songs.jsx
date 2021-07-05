var React = require('react');
var Navbar = require('./navbar');

class Songs extends React.Component{
    render(){
        // console.log(this.props);

        let playlists = this.props.playlist.map( items => {
            return (
                <option value={items.id}>
                    {items.playlist}
                </option>
                );
        });

        let songs = this.props.list.map( songs => {
            return(
                <div class="card d-inline-block m-2" style={{  width: '20rem'}}>
                  <img src={songs.artwork} class="card-img-top" alt="Image not found" />
                  <div class="card-body">
                    <h5 class="card-title">{songs.title}</h5>
                    <p class="card-text">Album: {songs.album}</p>
                    <p class="card-text">Artist: {songs.artist_name}</p>
                    <a href={songs.preview_link} class="btn btn-success mr-2  mb-2">Preview</a>
                    <a href={"/edit/song/" + songs.id}class="btn btn-secondary mr-2  mb-2">Edit</a>
                    <form method="POST" action={"/delete/song/" + songs.id + "?_method=DELETE"} class = "d-inline-block">
                        <button type="submit" className="btn btn-danger mb-2">Delete</button>
                    </form>
                    <div class="input-group" style={{  width: '18rem'}}>
                        <form method="POST" action={"/playlist/addsong/" + songs.id} id="playlistform">
                          <select class="custom-select" name="playlist">
                                <option selected>Choose...</option>
                                {playlists}
                            </select>
                              <div class="input-group-append">
                                <button class="btn btn-outline-info" type="submit">Add to Playlist</button>
                              </div>
                        </form>
                    </div>
                  </div>
                </div>
            );
        });

        return(
            <Navbar>
                <div>
                    <h1>Here are the songs:</h1>
                    {songs}
                </div>
            </Navbar>
            );
    }
}

module.exports = Songs;

// class Options extends React.Component{
//     render(){
//         return(
//             <option value={this.props.playlists.id}>
//                 {this.props.playlists.playlist}
//             </option>
//         );
//     }
// }

// class SongList extends React.Component{
//     render(){
//         console.log(this.props);
//         let playlists = this.props.playlist.map( items => {
//             return (
//                 <option value={items.id}>
//                     {items.playlist}
//                 </option>
//                 );
//         });
//         return(
//             <div class="card d-inline-block m-2" style={{  width: '20rem'}}>
//               <img src={this.props.list.artwork} class="card-img-top" alt="Image not found" />
//               <div class="card-body">
//                 <h5 class="card-title">{this.props.list.title}</h5>
//                 <p class="card-text">Album: {this.props.list.album}</p>
//                 <p class="card-text">Artist: {this.props.list.artist_name}</p>
//                 <a href={this.props.list.preview_link} class="btn btn-success mr-2  mb-2">Preview</a>
//                 <a href={"/edit/song/" + this.props.list.id}class="btn btn-secondary mr-2  mb-2">Edit</a>
//                 <form method="POST" action={"/delete/song/" + this.props.list.id + "?_method=DELETE"} class = "d-inline-block">
//                     <button type="submit" className="btn btn-danger mb-2">Delete</button>
//                 </form>
//                 <div class="input-group" style={{  width: '18rem'}}>
//                     <form method="POST" action={"/playlist/addsong/" + this.props.list.id} id="playlistform">
//                       <select class="custom-select" name="playlist">
//                             <option selected>Choose...</option>
//                             {playlists}
//                         </select>
//                           <div class="input-group-append">
//                             <button class="btn btn-outline-info" type="submit">Add to Playlist</button>
//                           </div>
//                     </form>
//                 </div>
//               </div>
//             </div>
//         );
//     }
// }

// class Songs extends React.Component{
//     render(){
//         // console.log(this.props);
//         let songs = this.props.list.map( songs => {
//             return <SongList list={songs}></SongList>;
//         });
//         return(
//             <Navbar>
//                 <div>
//                     <h1>Here are the songs:</h1>
//                     {songs}
//                 </div>
//             </Navbar>
//             );
//     }
// }


