var React = require("react");

class SingleArtist extends React.Component {
  render() {
    const list = this.props.artist.map((card) => {
        return (
            <div>
                <img width="400px" height="400px" src={card.photo_url} alt={card.name}/>

                <p><strong>Artist ID :</strong> {card.id}</p>
                <p><strong>Artist Name:</strong> {card.name}</p>
                <p><strong>Artist Nationality:</strong> {card.nationality}</p>
            </div>
        )
})
    const artistName = this.props.artist.map((card) =>{
        return <h3><strong>Welcome to the page of {card.name} @ TUNR TABLE!</strong></h3>
    })
    return (
        <html>
            <head>
                <title>Artist Card</title>
            </head>
            <body>
                {artistName}
                {list}
            </body>
        </html>
        );
    }
}

module.exports = SingleArtist;