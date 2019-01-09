var React = require("react");
// class ListArtists extendes React.Component {
//     render() {
//         return
//     }
// }

class Home extends React.Component {
  render() {
    console.log(this.props.artists);
    const artist = this.props.artists.map ((each,index)=>{
        return <div key={index}>
                    <h4>Artist : <span>{each.name}</span></h4>
               </div>
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artist</h1>
          {artist}
        </body>
      </html>
    );
  }
}

module.exports = Home;