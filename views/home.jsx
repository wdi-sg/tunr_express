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
        let link = `/artist/${each.id}`;
        return <div key={index}>
                    <h4>Artist : <a href = {link}>{each.name}</a></h4>
               </div>
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artist</h1>
          {artist}
          <button><a href= "/artist/new">New Artist</a></button>
        </body>
      </html>
    );
  }
}

module.exports = Home;