var React = require("react");

class List extends React.Component {
  render() {
    let specificArtists = this.props.specificArtist

    let listArtist = specificArtists.map(item=>{
        let artistPath = "/index/" +item.id

        return <li>{item.name}
                <img src={item.photo_url}/>
                <a href={artistPath}>show</a>
                </li>
    })

    console.log(listArtist)
    return (
            <ul>{listArtist}</ul>



    );
  }
}



class Home extends React.Component {
  render() {
    let artists = this.props.artists

    let newArtistLink = "/new"

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <h2>Artist</h2>
          <a href= {newArtistLink}> Add new artist</a>
          <ul><List specificArtist = {artists}/></ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
