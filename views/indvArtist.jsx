const React = require("react");
const DefaultLayout = require('./layouts/default');


class Artist extends React.Component {
  render() {

    let artist = this.props.artist[0];
    let id = this.props.id;
    let imgStyle = {width: '300px', height: '300px'}
    let buttonStyle = {'fontSize': '25px'}

    let headerTitle = `${artist.name} | Tunr`;
    let editURL = `/artists/${id}/edit`;
    let deleteURL = `/artists/${id}/delete`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>{artist.name}</h1>
        <p>{artist.nationality}</p>
        <img style={imgStyle} src={artist.photo_url}/>
        <br/>
        <br/>

        <form action={editURL}>
            <button style={buttonStyle} type={"submit"}>EDIT ARTIST</button>
        </form>

        <br/>
        <br/>

        <form action={deleteURL}>
            <button style={buttonStyle} type={"submit"}>DELETE ARTIST</button>
        </form>

        <br/>
        <br/>

        <h4>Songs:</h4>


      </DefaultLayout>
    );

  }
}

module.exports = Artist;