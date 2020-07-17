var React = require('react');

const ArtistInfo = require('./components/artistsDetail.jsx');

class Artist extends React.Component {
  render() {
    console.log("single artist");
    console.log(this.props.data)
    return (
     
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css?family=Dosis&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style1.css"/>
        
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

          <div className ="artist">
              <p>{this.props.data.name}</p>
              <img src = {this.props.data.photo_url} />
              <p>{this.props.data.nationality}</p>
          </div>

          <footer> © 2019 Song-collection GA All rights reserved.</footer>
         
        </body>
      </html>
    );  
  }
}

module.exports = Artist;