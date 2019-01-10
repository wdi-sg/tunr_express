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
                <a href={"/artist/" + this.props.list.id + "/songs/"}class="btn btn-info mr-2 mb-2">Songs</a>
                <a href={"/artist/" + this.props.list.id + "/songs/new"}class="btn btn-dark mr-2 mb-2">Add Song</a>
                <a href={"/edit/artist/" + this.props.list.id}class="btn btn-success mr-2 mb-2">Edit</a>
                <form method="POST" action={"/delete/artist/" + this.props.list.id + "?_method=DELETE"} class = "d-inline-block">
                    <button type="submit" className="btn btn-danger">Delete</button>
                </form>

              </div>
            </div>
        );
    }
}
                // <a href={"/delete/artist/" + this.props.list.id} data-method="delete" class="btn btn-danger">Delete</a>

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