var React = require("react");

class NewSong extends React.Component {
  render() {
    const {id} = this.props;
    return (
      <div>
        <form action={`/artists/${id}/songs`} method="post" id="song">
          <div>
            <label htmlFor="name">Song title: </label>
            <input type="text" name="title"/>
          </div>
          <div>
            <label htmlFor="name">Album name: </label>
            <input type="text" name="album"/>
          </div>
          <div>
            <label htmlFor="artwork">Cover image: </label>
            <input type="text" name="artwork"/>
          </div>
          <div>
            <label htmlFor="preview_link">Sample: </label>
            <input type="text" name="preview_link"/>
          </div>
        </form>
        <button type="submit" form="song" value="submit">
            Add
        </button>
      </div>
    );
  }
}

module.exports = NewSong;
