var React = require("react");
var DefaultLayout = require("./layout/default");


class SongsList extends React.Component {
  render() {
    return (
      <DefaultLayout>
      <h3>Add new songs!</h3>
      <form action={"/artist/" + this.props.artists.id +"/songs" + "?_method=POST"
      } method="POST">
      <input type="name" name="title" placeholder="Title:"/>
      <input type="name" name="album" placeholder="Album:"/>
      <input type="name" name="preview_link" placeholder="Preview Link:"/>
      <input type="name" name="artwork" placeholder="Artwork:"/>
      <input type="name" name="artist_id" placeholder="Artist id:"/>
      <input type="submit"/>
      </form>
      </DefaultLayout>

      );
}
}

module.exports = SongsList;