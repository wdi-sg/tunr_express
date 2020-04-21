var React = require('react');

class Index extends React.Component {
    render() {
       const artistList = this.props.artists.map(artist => {

         return <li>{artist.name}
         <img src={artist.photo_url}/>
         {artist.nationality}</li>
       });
         return (<html>
             <head/>
             <body>
                 <h1>Artists:</h1>
                 <ul>{artistList}</ul>
                 <p>Number of visits:</p>
                 <p>{this.props.badge}</p>
             </body>
         </html>);
     }
 }

module.exports = Index;