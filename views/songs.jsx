var React = require("react");
var Layout = require('./layout')


class Song extends React.Component {
  render() {

    const songs = this.props.songs.map((song,i)=>{
           return <li key = {i}> {song.title}, {song.album} </li>
        })



    return (
       <Layout>
          <h1>Songs by {this.props.name}</h1>


          <ul>
            {songs}

          </ul>
        </Layout>
    );
  }
}

module.exports = Song;