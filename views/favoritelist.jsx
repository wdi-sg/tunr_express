var React = require("react");
var Layout = require("./layout")

class Favoritelist extends React.Component {
  render() {

    const name = this.props.username

    const favorites = this.props.songs.map((song, index)=>{
        return <li key = {index}>
        <div> Title: {song.title}</div>
        <div> Album: {song.album}</div>
        <div> Artist: {song.name}</div>
        </li>
    })


    return (
      <Layout>
          <h1>Username: {name}</h1>


          <h2>You favorite songs:</h2>
          <ul>
            {favorites}
          </ul>

       </Layout>
    );
  }
}

module.exports = Favoritelist;