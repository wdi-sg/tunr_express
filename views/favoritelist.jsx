var React = require("react");
var Layout = require("./layout")

class Favoritelist extends React.Component {
  render() {

    const name = this.props.username

    const favorites = this.props.songs.map((song, index)=>{
        return <li key = {index} style = {{margin:"7px 0"}}>
        <div> Title: {song.title}</div>
        <div> Album: {song.album}</div>
        <div> Artist: {song.name}</div>
        </li>

    })


    return (
      <Layout>
          <h2>Your username: </h2>
          <h1>{name}</h1>
          <br/>
          <h2>Your favorite songs:</h2>
          <ul>
            {favorites}
          </ul>

          <br/>
          <div className = "d-flex justify-content-center">
                    <a href="/favorites/new"><input type="submit" className="btn btn-primary " value="Add new favorite"/></a>
        </div>
       </Layout>
    );
  }
}

module.exports = Favoritelist;