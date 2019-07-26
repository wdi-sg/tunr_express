var React = require('react');

class Form extends React.Component {
  render() {
    console.log("new song");
    let listOfArtists = this.props.data.map(item => {
      let url = "/artist/"+item.id;
      return <a href={url}><option>{item.name}</option></a>
    });
    
    // let artistChoice = listOfArtists.map(name => {
    //   return <option value="">{name}</option>

    // })
    return (
      <html>
        <head>
              <link href="https://fonts.googleapis.com/css?family=Dosis|Work+Sans&display=swap" rel="stylesheet"/>

              <link rel="stylesheet" type="text/css" href="/style1.css"/>
          </head>
        <body>
        <header>
            <h1> Artist List</h1>
              <nav>
                <ul>
                  <li><a href="/">All artists</a></li>
                  <li><a href="#">All songs</a></li>
                  <li><a href="#">Search songs</a></li>
                </ul>
              </nav>
          </header>
          <div>
            <h1>Add new song</h1>
            
                <select name="artist_id">
                {listOfArtists}
                </select>
                
                
          </div>
          <footer> © 2019 Song-collection GA All rights reserved.</footer>
        </body>
      </html>
    );
  }
}

module.exports = Form;