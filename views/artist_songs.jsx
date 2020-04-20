const React = require('react');
class Artist_Songs extends React.Component {
    render () {

        let artistName = this.props.artist[0].name;
        const songsList = this.props.songs;
        const addSongPage = '/artists/' + this.props.id + '/songs/new'

        const displaySongs = songsList.map(song => {
            let songDetailsId = '/artists/' + this.props.id + '/songs/' + song.id;
            return (
                <div className="card" style={{width: "13rem"}}>
                    <img className="card-img-top" src={song.artwork} alt={song.title} style={{height: "10rem"}}/>
                    <div className="card-body justify-content-center">
                        <h4 className="card-title text-center">{song.title}</h4>
                        <p className="card-text text-center">{song.album}</p>
                        <div className='row justify-content-center'>
                            <div className='col-6'>
                                <button className='btn btn-info'><a href={song.preview_link} className='text-white text-decoration-none'>Preview</a></button>
                            </div>
                            <div className='col-6 d-flex justify-content-center'>
                                <button className='btn btn-primary'><a href={songDetailsId} className='text-white text-decoration-none'>Details</a></button>
                            </div>
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
                    <h2 className='text-center'>Songs by {artistName}</h2>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-secondary'><a href='/artists/list' className='text-white text-decoration-none'>Back to Artists List</a></button>
                        </div>
                        <div className='col-2 d-flex justify-content-center'>
                            <button className='btn btn-warning'><a href={addSongPage} className='text-dark text-decoration-none'>Add Song</a></button>
                        </div>
                        <div className='col-2 d-flex justify-content-start'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        {displaySongs}
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Artist_Songs;