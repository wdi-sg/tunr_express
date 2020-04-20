const React = require('react');
class Song extends React.Component {
    render () {

        const title = this.props.title;
        const album = this.props.album;
        const preview_link = this.props.preview_link;
        const artwork = this.props.artwork;
        const artist_id = this.props.artist_id;
        const artist_name = this.props.artist_name;

        const artistPage = '/artists/' + artist_id + '/songs';

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="card" style={{width: "24rem"}}>
                            <img className="card-img-top" src={artwork} alt={title} style={{height: "20rem"}}/>
                            <div className="card-body justify-content-center">
                                <h5 className="card-title text-center">{title}</h5>
                                <p className="card-text text-center">{album}</p>
                                <p className="card-text text-center">{artist_name}</p>
                                <div className='row justify-content-center'>
                                    <button className='btn btn-info'><a href={preview_link} className='text-white text-decoration-none'>Preview Song</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-center'>
                            <button className='btn btn-secondary'><a href={artistPage} className='text-white text-decoration-none'>Artist Songs</a></button>
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Song;