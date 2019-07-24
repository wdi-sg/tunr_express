var React = require("react");

class DisplaySongs extends React.Component {
  render() {

    const artistSongs = this.props.songs;

    let allSongs = artistSongs.map(obj => {

        return <div class = "singleSong-container">
                <h2> {obj.title} </h2>



    }); //all Songs CT



module.exports = DisplaySongs;