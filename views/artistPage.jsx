var React = require('react');
const Template = require('./template.jsx');

class ArtistPage extends React.Component {
  render() {
    var url = '/artists';
    var editURL = '/artists/' + this.props.artist.id + '/edit';
    var deleteURL = '/artists/' + this.props.artist.id + '?_method=DELETE' ;
    return (
      <Template>
        <div>
          <a href={url}> Back to Artists</a>
          <h1>{this.props.artist.name}</h1>
          <p>{this.props.artist.nationality}</p>
          <img src={this.props.artist.photo_url}></img>
          {/*<a href={editURL}> Edit Artist</a>*/}
          <form action={editURL}>
              <input type="submit" value="Edit Artist"/>
          </form>
          <form method="POST" action={deleteURL}>
              <input type="submit" value="Delete Artist"/>
          </form>
        </div>
      </Template>
    );
  }
}

module.exports = ArtistPage;
