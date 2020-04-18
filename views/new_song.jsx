const React = require("react");

class New_Song extends React.Component {
  render() {


    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>New Song</h1>
                <br/>
                <form method='POST' action='/playlist'>
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
                            <option></option>
                            {allArtistsList}
                        </select></p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New_Song;