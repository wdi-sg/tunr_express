var React = require('react');
var DefaultLayout = require('./default');

class SongssongId extends React.Component {
  render() {

    const eachArtist = this.props.artist.map ((song,index)=>{
        let editLink = `/song/${song.id}/${song.album}/edit`;
        let actionDelete = `/song/${song.title}?_method=DELETE`;
        return <div className="container-fluid" key = {index}>

                     <div className="row">
                        <div className="col">
                            <h2>Artis Id: {song.artist_id}</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h4>Song Title: {song.title}</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h4>Album Title: {song.album}</h4>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-1">
                            <button type="button" className="btn btn-primary"><a href= {editLink}> edit </a></button>
                        </div>
                        <div className="col-1">
                            <form method="POST" action={actionDelete}>
                                    <button type="button" className="btn btn-danger"> delete </button>
                            </form>
                        </div>
                    </div>
               </div>
    })

    return (
        <DefaultLayout>
            {eachArtist}
        </DefaultLayout>
    );
  }
}

module.exports = SongssongId;