const React = require('react');
class All_Playlists extends React.Component {
    render () {

        const playlists = this.props.playlists;
        const visitCounter = this.props.visitCounter;

        const allPlaylists = playlists.map(playlist => {
            let playlistIdPage = '/playlists/' + playlist.id;
            return (<h5><li><a href={playlistIdPage}>{playlist.name}</a></li></h5>)
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h2 className='text-center'>List of Playlists</h2>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-primary'><a className='text-white text-decoration-none' href='/playlists/new'>Add Playlist</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <ol>
                            {allPlaylists}
                        </ol>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                    <br/>
                </div>
                <br/><br/><br/>
                <div className='row justify-content-center'>
                    <p style={{color: "grey", borderTop: "1px solid gainsboro", borderBottom:"1px solid gainsboro", padding: "5px 20px"}}>Page Visits: {visitCounter}</p>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = All_Playlists;