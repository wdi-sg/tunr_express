var React = require("react");

class EditArtist extends React.Component {
  render() {
    let id= this.props.artist[0].id;
    let imgLink = this.props.artist[0].photo_url;
    let name = this.props.artist[0].name;
    let nationality = this.props.artist[0].nationality;

    return (
      <html>
        <head />
        <body>
        <h3>Edit Artist Information</h3>
          
          <form action={"/artist/" + id + "?_method=PUT"} method="POST">
                <h4>Name</h4>
                <input type="text" name="name" placeholder="e.g. Briyani Chua" defaultValue={name}/>

                <h4>Photo Url</h4>
                <input type="text" name="photoUrl" placeholder="e.g. https://wwww.google.com/" defaultValue={imgLink}/>
                              
                <h4>Nationality</h4> 
                <input type="text" name="nationality" placeholder="e.g. Brazil" defaultValue={nationality}/>
                <br/>
                <input type="submit"/>
          </form>
          <form method="POST" action={"/artist/"+ id + "?_method=delete"}>
                <input type="submit" value="Delete This Artist"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = EditArtist;
