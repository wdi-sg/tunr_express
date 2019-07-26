const React = require("react");
const DefaultLayout = require('./layouts/default');


class Artist extends React.Component {
  render() {


    let artist = this.props.artist;
    let id = this.props.id;
    let imgStyle = {width: '300px', height: '300px'}
    let buttonStyle = {'fontSize': '25px'}

    let editURL = `/artists/${id}/edit`;
    let deleteURL = `/artists/${id}?_method=DELETE`;
    let songsURL = `/artists/${id}/songs`;

    let headerTitle = `${artist.name} | Tunr`;

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

        <form method="POST" action={deleteURL}>
            <button style={buttonStyle} type={"submit"}>DELETE ARTIST</button>
        </form>

        <br/>
        <br/>

        <form action={songsURL}>
            <button style={buttonStyle} type={"submit"}>VIEW SONGS</button>
        </form>


        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">DELETE ARTIST</button>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h4 className="text-center modal-title">DELETE ARTIST?</h4>

              </div>
              <div className="modal-body">
                <p>Delete {artist.name}?</p>
              </div>
              <div className="modal-footer justify-content-center">
                <form method="POST" action={deleteURL}>
                    <button type="submit" className="btn btn-default">Confirm</button>
                </form>
                <button type="button" className="btn btn-default" data-dismiss="modal">Back</button>
              </div>
            </div>

          </div>
        </div>






      </DefaultLayout>
    );

  }
}

module.exports = Artist;