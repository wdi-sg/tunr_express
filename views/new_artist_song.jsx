const React = require("react");

class New_Artist_Song extends React.Component {
  render() {

    const artistName = this.props.artist.name;
    const backToArtistPage = '/artists/' + this.props.artist.id + '/songs';

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>New Song</h1>
                <h5 className='text-center'>By {artistName}</h5>
                <br/>
                <form method='POST' action='/artists/songs'>
                    <div className='row justify-content-center'>
                        <p>Title <input type='text' name='title' placeholder='Enter title'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Album <input type='text' name='album' placeholder='Enter album'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Preview Link <input type='text' name='preview_link' placeholder='Enter preview URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Artwork <input type='text' name='artwork' placeholder='Enter artwork URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Choose an Artist <select className='border border-secondary' style={{width: "10rem", height: "2rem"}} name='artist'>
                            <option>{artistName}</option>
                        </select></p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-secondary'><a href={backToArtistPage} className='text-white text-decoration-none'>Back to Songs Page</a></button>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New_Artist_Song;