var React = require("react");

class Edit extends React.Component {
  render() {
    


    return (
      <html>
        <head>
          <h1>Edit artist in the list</h1>
        </head>
        <body> 
          <form  method="POST" action={"/artists/" + this.props.artist.id + "?_method=PUT"}>  
            <h3>Artist Name</h3>
            <input type="text" name="name" defaultValue={this.props.artist.name} placeholder={this.props.artist.name}></input>
            <h3>Photo</h3>
            <input type="text" name="photo_url" defaultValue={this.props.artist.photo_url} placeholder={this.props.artist.photo_url}></input>
            <h3>Nationality</h3>
            <input type="text" name="nationality" defaultValue={this.props.artist.nationality} placeholder={this.props.artist.nationality}></input>   
            <button type="submit">SUBMIT</button>         
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
