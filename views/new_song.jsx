var React = require("react");

class New extends React.Component {
  render() {


    return (
      <html>
        <head>
          <h1>Add new song to the list</h1>
        </head>
        <body> 
          <form action="/song" method="POST" >  
            <h3>Song Name</h3>
            <input type="text" name="title"></input>
            <h3>Album</h3>
            <input type="text" name="album"></input>
            <h3>Preview</h3>
            <input type="text" name="preview_link"></input>
            <h3>Artwork</h3>
            <input type="text" name="artwork"></input>
            <button type='submit'>SUBMIT</button>         
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;




