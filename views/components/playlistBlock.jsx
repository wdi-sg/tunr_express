const React = require("react");

class Block extends React.Component {
  render() {

    let playlists = this.props.playlists;

    let wholeDiv = {display: 'flex', 'flexFlow': 'wrap'}
    let indDiv = {margin: '20px'}
    let imgStyle = {width: '300px', height: '300px'
}
    let playlistArr = playlists.map((pl, i)=>{
        let playlistURL = `/playlists/${pl.id}`;
        return (
            <div style={indDiv}>
                <a href={playlistURL}>{i+1}. {pl.name}</a>
            </div>
        )
    })


    return (

        <div style={wholeDiv}>
            {playlistArr}
        </div>

    );

  }
}

module.exports = Block;