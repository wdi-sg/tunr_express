const React = require('react');
const DefaultLayout = require('./layouts/default');


class Edit extends React.Component {
  render() {

    let artist = this.props.artist;
    let id = this.props.id;

    let editURL = `/artists/${id}?_method=PUT`
    let headerTitle = `${artist.name} | Tunr`;


    return (

      <DefaultLayout title={headerTitle}>

        <h1>Edit Artist</h1>

        <form method="POST" action={editURL}>
            <p>Name:</p>
            <input type={"text"} name={"name"} value={artist.name}required/>
            <p>Nationality:</p>
            <input type={"text"} name={"nationality"} value={artist.nationality} required/>
            <p>Photo Link:</p>
            <input type={"text"} name={"photo_url"} value={artist.photo_url} required/>
            <br/>
            <br/>
             <input type="submit" value="EDIT ARTIST"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = Edit;