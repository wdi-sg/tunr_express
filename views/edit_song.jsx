var React = require("react");

class Edit extends React.Component {
  render() {
    


    return (
      <html>
        <head>
          <h1>Edit song in the list</h1>
        </head>
        <body> 
          <form  method="POST" action={"/songs/" + this.props.song.id + "?_method=PUT"}>  
            <h3>Song Name</h3>
            <input type="text" name="title" defaultValue={this.props.song.title} placeholder={this.props.song.title}></input>
            <h3>Album</h3>
            <input type="text" name="album" defaultValue={this.props.song.album} placeholder={this.props.song.album}></input>
            <h3>Preview</h3>
            <input type="text" name="preview_link" defaultValue={this.props.song.preview_link} placeholder={this.props.song.preview_link}></input> 
            <h3>Artwork</h3>
            <input type="text" name="artwork" defaultValue={this.props.song.artwork} placeholder={this.props.song.artwork}></input> 
            <button type="submit">SUBMIT</button>         
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
