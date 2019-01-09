var React = require('react');
var Navbar = require('./navbar');

class ArtistList extends React.Component{
    render(){
        return(
            <div class="card d-inline-block m-2" style={{  width: '18rem'}}>
              <img src={this.props.list.photo_url} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{this.props.list.name}</h5>
                <p class="card-text">Nationality: {this.props.list.nationality}</p>
                <a href={"/artist/" + this.props.list.id + "/songs/"}class="btn btn-secondary">Songs</a>
              </div>
            </div>
        );
    }
}

class Artist extends React.Component{
    render(){
        const artists = this.props.list.map( artists => {
            return <ArtistList list={artists}></ArtistList>;
        });
        return(
            <Navbar>
                <div>
                    <h1>Here are the artists:</h1>
                    {artists}
                </div>
            </Navbar>
            );
    }
}

module.exports = Artist;