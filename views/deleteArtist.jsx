var React = require('react');

// CancelDeleteButton redirects to /artist/:id/
class CancelDeleteButton extends React.Component {
    render() {
        let id = parseInt(this.props.id);
        // console.log("id is: "+ id);
        let goWhere = "/artist/"+id;
        // console.log("goWhere: "+ goWhere);
        return (
            <div>
                <form method="get" action={goWhere}>
                <input type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }
};

class DeleteArtist extends React.Component {
  render() {
    let artist = this.props.artist;
    let goWhere = "/artist/"+artist.id+"?_method=DELETE";
    console.log(goWhere);
    return (
      <div>
        <h1>Delete {artist.name}</h1>
        <p>Are you sure you want to delete {artist.name}? This action cannot be undone.</p>
        <form method="POST" action={goWhere}>
            <input type="submit" value="Delete artist"/>
        </form>
        <CancelDeleteButton id={artist.id}/>
      </div>
    );
  }
}

module.exports = DeleteArtist;