var React = require('react');

class WhySoManyPokemons extends React.Component {
  render() {
    console.log("THIS PROPS:", this.props.artists )
    let artID = this.props.artists.id;
    let actionUrl = '/artists/'+artID+'?_method=PUT'
    return (
      <div>
        <h1>EDIT ARTIST</h1>
        <form method="POST" action={actionUrl}>
            <p>name</p>
            <input name="name" value={this.props.artists.name} />
            <p>picture</p>
            <input name="photo_url" value={this.props.artists.photo_url}  />
            <p>nationality</p>
            <input name="nationality" value={this.props.artists.nationality} />
            <input type="submit" />
        </form>
      </div>
    );
  }
}

module.exports = WhySoManyPokemons;