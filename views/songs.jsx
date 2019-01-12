var React = require('react');
var Navbar = require('./navbar');

class SongList extends React.Component{
    render(){
        return(
            <div class="card d-inline-block m-2" style={{  width: '20rem'}}>
              <img src={this.props.list.artwork} class="card-img-top" alt="Image not found" />
              <div class="card-body">
                <h5 class="card-title">{this.props.list.title}</h5>
                <p class="card-text">Album: {this.props.list.album}</p>
                <p class="card-text">Artist: {this.props.list.artist_name}</p>
                <a href={this.props.list.preview_link} class="btn btn-success mr-2  mb-2">Preview</a>
                <a href={"/edit/song/" + this.props.list.id}class="btn btn-secondary mr-2  mb-2">Edit</a>
                <form method="POST" action={"/delete/song/" + this.props.list.id + "?_method=DELETE"} class = "d-inline-block">
                    <button type="submit" className="btn btn-danger mb-2">Delete</button>
                </form>
                <div class="input-group" style={{  width: '18rem'}}>
                    <form method="POST" action={"/playlist/addsong/" + this.props.list.id} id="playlistform">
                      <select class="custom-select" name="playlist">
                            <option selected>Choose...</option>
                            <option value="1">Current Playlist</option>
                            <option value="2">Second Playlist</option>
                            <option value="5">Another Playlist</option>
                        </select>
                          <div class="input-group-append">
                            <button class="btn btn-outline-info" type="submit">Add to Playlist</button>
                          </div>
                    </form>
                </div>
              </div>
            </div>
        );
    }
}

class Songs extends React.Component{
    render(){
        const songs = this.props.list.map( songs => {
            return <SongList list={songs}></SongList>;
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



                    // <div class="dropdown">
                    //   <a class="btn btn-secondary dropdown-toggle" href="#" role="button" type="submit" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    //     Add to playlist
                    //   </a>
                    //   <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    //     <a class="dropdown-item" href={"/playlist/addsong/1/" + this.props.list.id}>Current Playlist</a>
                    //     <a class="dropdown-item" href={"/playlist/addsong/2/" + this.props.list.id}>Second Playlist</a>
                    //     <a class="dropdown-item" href={"/playlist/addsong/3/" + this.props.list.id}>Another Playlist</a>
                    //   </div>
                    // </div>
                // <form method="POST" action={"/playlist/addsong/2/" + this.props.list.id} class = "d-inline-block">
                //     <button type="submit" className="btn btn-info">Add to Playlist 2</button>
                // </form>