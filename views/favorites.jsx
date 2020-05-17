var React = require('react');
var Layout = require('./components/layout.jsx');

class Favorites extends React.Component {
  render() {

    const songs = this.props.favorites.map(songs =>{
        return (
            <div className = "songsList">
                <h3>{songs.title}</h3>
                <audio controls>
                    <source src={songs.preview_link} type="audio/mp3"/>
                </audio>
            </div>
        )
    });

    return(
        <Layout>
            <h1> All Your Favorite Songs </h1>
                <div className = "container">
                <div class = "songsContainer">
                {songs}
                </div>
            </div>
        </Layout>
    )
  }
}


module.exports = Favorites;