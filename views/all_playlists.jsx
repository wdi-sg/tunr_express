const React = require('react');
class All_Playlists extends React.Component {
    render () {

        const playlists = this.props.playlists;
        const allPlaylists = playlists.map(playlist => {
            return (<li>{playlist.name}</li>)
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
                        <button className='btn btn-warning'><a href='/artists/songs' className='text-dark text-decoration-none'>List of Songs</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <ol>
                            {allPlaylists}
                        </ol>
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

module.exports = All_Playlists;