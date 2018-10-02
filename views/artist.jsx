var React = require("react");

class artist extends React.Component {
  render() {
    console.log("WE ARE IN INDEX REACT", this.props.artists);

    const artistsElements = this.props.artists.map((artist)=>{

    // let linkPath = "/artists/new?artist_id="+artist.id;

    return (<li>
          {artist.id} : <a href={artist.photo_url} target="_blank"> {artist.name} </a>
        </li>);


  });

    return (
          <html>
            <head>
            <title>Artist Index</title>
            </head>
            <body>
              <div>
              <h1>Artist Index</h1>
              <ul>
                {artistsElements}
              </ul>
              </div>
            </body>
          </html>

          );

 }
};

module.exports = artist;

// return (
//       <html>
//         <head>
//         <title>Artist Index</title>
//         <link rel="stylesheet" type="text/css" href="/style.css"></link>
//         </head>
//         <body>
//           <div>
//           <h1>Artist Index</h1>
//           <ul>
//             {artistsElements}
//           </ul>
//           </div>
//         </body>
//       </html>

//       );