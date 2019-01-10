var React = require("react");

class New extends React.Component {
  render() {


    return (
      <html>
        <head>
          <h1>Add new artist to the list</h1>
        </head>
        <body> 
          <form action="/artists/updated" method="POST" >  
            <h3>Artist Name</h3>
            <input type="text" name="name"></input>
            <h3>Photo</h3>
            <input type="text" name="photo_url"></input>
            <h3>Nationality</h3>
            <input type="text" name="nationality"></input>   
            <button type='submit'>SUBMIT</button>         
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
