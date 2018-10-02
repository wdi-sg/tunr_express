var React = require("react");

class artist extends React.Component {
  render() {
    console.log("WE ARE IN SINGLE ARTIST", this.props);

    // const oneArtistElements = this.props.artists.map((artist)=>{

    // let linkPath = "/artists/new?artist_id="+artist.id;
        return(
          <div>
            <h2>{this.props.artists.name}</h2>
            <img src= {this.props.artists.photo_url} />
            <p>nationality: {this.props.artists.nationality}</p>
          </div>
          )
    // return (<li>
    //       {artist.id} : <a href={artist.photo_url} target="_blank"> {artist.name} </a>
    //     </li>);


  // });

    // return (
    //       <html>
    //         <head>
    //         <title>Artists Index</title>
    //         </head>
    //         <body>
    //           <div>
    //           <h1>Artists Index</h1>
    //           <ul>
    //             {artistsElements}
    //           </ul>
    //           </div>
    //         </body>
    //       </html>

    //       );

 }
};

module.exports = artist;
