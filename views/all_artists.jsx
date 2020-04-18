const React = require('react');
class All_Artists extends React.Component {
    render () {
        const artists = this.props.list;
        const displayArtist = artists.map(artist => {
        let idPage = '/artists/' + artist.id;
        let songPage= '/artists/' + artist.id + '/songs'

            return (
                <div className="card" style={{width: "15rem"}}>
                    <img className="card-img-top" src={artist.photo_url} alt={artist.name} style={{height: "12rem"}}/>
                    <div className="card-body">
                        <h4 className="card-title text-center">{artist.name}</h4>
                        <p className="card-text text-center">{artist.nationality}</p>
                        <br/>
                        <div className='row justify-content-center'>
                            <div className='col-5'>
                                <button className='btn btn-primary'><a href={idPage} className='text-white text-decoration-none'>Profile</a></button>
                            </div>
                            <div className='col-5'>
                                <button className='btn btn-info'><a href={songPage} className='text-white text-decoration-none'>Songs</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h1 className='text-center'>List of Artists</h1>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-warning'><a href='/artists/songs/' className='text-dark text-decoration-none'>List of Songs</a></button>
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center '>
                        {displayArtist}
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = All_Artists;