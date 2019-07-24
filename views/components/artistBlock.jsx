const React = require("react");

class Block extends React.Component {
  render() {

    let artists = this.props.artists;

    let wholeDiv = {display: 'flex', 'flexFlow': 'wrap'}
    let indDiv = {margin: '20px'}
    let imgStyle = {width: '300px', height: '300px'
}
    let artistArr = artists.map((artist)=>{
        return (
            <div style={indDiv}>
                <p>{artist.name}</p>
                <p>{artist.nationality}</p>
                <a href={'/artists/'+artist.id}>
                    <img style={imgStyle} src={artist.photo_url}/>
                </a>
            </div>
        )
    })


    return (

        <div style={wholeDiv}>
            {artistArr}
        </div>

    );

  }
}

module.exports = Block;