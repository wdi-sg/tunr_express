var React = require('react');
var Layout = require('./components/layout.jsx');

class AddToFavorites extends React.Component {
  render() {

    const songs = this.props.songs.map(songs =>{
        return (
            <div class="checkbox">
              <label><input type="checkbox"
              name = "favorite_song" value={songs.id}/>{songs.title}</label>
            </div>
        )
    });

    return(
        <Layout>
            <h1> Choose songs to add to favorites </h1>
                <form  action = "/favorites/new" method ="POST" className = "add-songs-to-favorites">
                        {songs}
                    <input type = "submit" value="Add to favorites" />
                </form>
        </Layout>
    )
  }
}


module.exports = AddToFavorites;