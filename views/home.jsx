var React = require('react');
const ArtistInfo = require('./components/artistsDetail.jsx');
class Home extends React.Component {
  render() {
    console.log(this.props);
    let listOfArtist = this.props.artists.map(artist => {
      return <ArtistInfo display ={artist} id = {this.props.artists.id}/>
      console.log(id);
      });
    return (
      <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css?family=Dosis|Work+Sans&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
         
        </head>
        <body>

          <header>
            <h1> Artist List</h1>
              <nav>
                <ul>
                  <li><a href="#/">All artists</a></li>
                  <li><a href="#">All songs</a></li>
                  <li><a href="#">Search artist</a></li>
                </ul>
              </nav>
          </header>

          <div className = "main">
            
            {listOfArtist}
          </div>
          <footer> © 2019 Song-collection GA All rights reserved.</footer>
        </body>
      </html>
    );
  };

}
module.exports = Home;