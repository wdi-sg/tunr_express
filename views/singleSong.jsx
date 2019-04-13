var React = require("react");

class SingleSong extends React.Component {
  render() {
    const list = this.props.song.map((card) => {
        return (
            <div>
                <img width="400px" height="400px" src={card.artwork} alt={card.title}/>
                <p><strong>Song ID :</strong> {card.id}</p>
                <p><strong>Song Name:</strong> {card.title}</p>
                <p><strong>Album Name:</strong> {card.album}</p>
                <p><strong>Listen: </strong><a href={card.preview_link}>{card.title}</a></p>
                <p><strong>Artist ID:</strong> {card.artist_id}</p>
            </div>
        )
})
    const songName = this.props.song.map((card) =>{
        return <h3><strong>Welcome to the <mark>{card.title}</mark> page @ TUNR TABLE!</strong></h3>
    })
    return (
        <html>
            <head>
                <title>Song Card</title>
            </head>
            <body>
                {songName}
                {list}
            </body>
        </html>
        );
    }
}

module.exports = SingleSong;