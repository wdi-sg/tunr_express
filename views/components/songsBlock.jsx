const React = require("react");

class Block extends React.Component {
  render() {

    let songs = this.props.songs;

    let wholeDiv = {display: 'block'}
    let indDiv = {margin: '20px'}
    let imgStyle = {width: '300px', height: '300px'
}
    let songsArr = songs.map((song)=>{
        return (
            <div style={indDiv}>
                <p>Title: {song.title}</p>
                <p>Album: {song.album}</p>
                <audio controls>
                  <source src={song.preview_link} type="audio/mpeg"/>
                </audio>
            </div>
        )
    })


    return (

        <div style={wholeDiv}>
            {songsArr}
        </div>

    );

  }
}

module.exports = Block;