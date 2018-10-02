var React = require('react');

class NewArtist extends React.Component {
  render() {
    return (
      <div>
        <h1>New Artist</h1>
        <form action="/artist" method="POST">
            <label>Name</label><input type="text" name="name" /><br />
            <label>Image URL</label><input type="varchar(2083)" name="photo_url" /><br />
            <label>Nationality</label><input type="text" name="nationality" /><br />
            <input type="submit"/>
        </form>
      </div>
    );
  }
}

module.exports = NewArtist;