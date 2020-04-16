const React = require('react');
class List extends React.Component {
    render () {
        const artists = this.props.list;
        const displayArtist = artists.map(artist => {
            let idPage = '/artists/' + artist.id + '/songs';
            return (
                <div className="card" style={{width: "15rem"}}>
                    <img className="card-img-top" src={artist.photo_url} alt={artist.name} style={{height: "12rem"}}/>
                    <div className="card-body">
                        <h4 className="card-title text-center">{artist.name}</h4>
                        <p className="card-text text-center">{artist.nationality}</p>
                        <br/>
                        <div className='row justify-content-center'>
                            <button className='btn btn-info'><a href={idPage} className='text-white text-decoration-none'>Songs</a></button>
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
                        <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
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

module.exports = List;