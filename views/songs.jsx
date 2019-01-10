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
                <a href={this.props.list.preview_link} class="btn btn-secondary">Preview</a>
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