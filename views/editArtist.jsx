var React = require('react');

class editArtist extends React.Component {
  render() {
    let profile = this.props.searched[0];
    
    return (
      <html>
        <body>
          <div>
            <h1>Editing artist {this.props.title}</h1>
            <form method="POST" action={"/artists/'+artists.id+'?_method=put"}>
                <div class="artist-attribute">
                    <b>ID: </b>
                    <input type="text" name="id" value={profile.id}/>
                    <br></br>
                    <b>Name: </b>
                    <input type="text" name="name" value={profile.name}/>
                    <br></br>
                    <b>Photo URL: </b>
                    <input type="text" name="photo_url" value={profile.photo_url}/>
                    <br></br>
                    <b>Nationality: </b>
                    <input type="text" name="nationality" value={profile.nationality}/>
                    <br></br>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = editArtist;