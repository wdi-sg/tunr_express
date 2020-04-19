const React = require('react');
class All_Songs extends React.Component {
    render () {

        const allSongsList = this.props.allSongs;

        const displayAllSongs = allSongsList.map(song => {
            let songDetailsId = '/artists/' + song.artist_id + '/songs/' + song.id;
            return (
                <div className="card" style={{width: "13rem"}}>
                    <img className="card-img-top" src={song.artwork} alt={song.title}/>
                    <div className="card-body justify-content-center">
                        <h5 className="card-title text-center">{song.title}</h5>
                        <p className="card-text text-center">{song.album}</p>
                        <div className='row justify-content-center'>
                            <div className='col-6'>
                                <button className='btn btn-info'><a href={song.preview_link} className='text-white text-decoration-none'>Preview</a></button>
                            </div>
                            <div className='col-6 d-flex justify-content-center'>
                                <button className='btn btn-primary'><a href={songDetailsId} className='text-white text-decoration-none'>Details</a></button>
                            </div>
                        </div>
                        <br/>
                        <div className='row justify-content-center'>
                            <button className='btn btn-success'><a href='#' className='text-white text-decoration-none'>Add to Playlist</a></button>
                        </div>
                    </div>
                </div>
            );
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h2 className='text-center'>List of Songs</h2>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-6 d-flex justify-content-end'>
                            <button className='btn btn-warning'><a href='/artists/list' className='text-dark text-decoration-none'>List of Artists</a></button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        {displayAllSongs}
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                    <br/>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = All_Songs;