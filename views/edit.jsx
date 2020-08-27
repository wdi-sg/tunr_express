var React = require("react");

class Edit extends React.Component {
  render() {
    const artist = this.props.artist;
    const id =this.props.id;
    const urlHere ="/artists/" + id + "?_method=put";
    let deleteURL = "/artists/"+id+"?_method=delete"


    return (
      <html>
        <head />
        <body>
          <h3>UPDATE FOR ARTIST {artist}</h3>
              <form method ="POST" action={urlHere} >
                Artist Name<input type="text" name="artistName" placeholder = "artist id"/>
               <br/>
               <br/>
                PHOTO LINK<input type="text" name="photoURL"/>
               <br/>
               <br/>
               Nationality <input type="text" name="nationality"/>
               <br/>
               <br/>

               <input type="submit" value="Submit"/>
            </form>
            <br/><br/>
          <form method="POST" action={deleteURL}>
          <input type="submit" value="DELETE ARTIST"/>

          </form>
          <br/><br/>

        </body>
      </html>
    );
  }
}

module.exports = Edit;