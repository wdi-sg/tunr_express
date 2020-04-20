const React = require("react");

class New_Playlist extends React.Component {
  render() {

    const visitCounter = this.props.visitCounter;

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>New Playlist</h1>
                <br/>
                <form method='POST' action='/playlists/'>
                    <div className='row justify-content-center'>
                        <p>Name <input type='text' name='name' placeholder='Enter name'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='text-center text-secondary'>You can add songs to the playlist later.</p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                </div>
            </div>
            <br/><br/><br/>
            <div className='row justify-content-center'>
                <p style={{color: "grey", borderTop: "1px solid gainsboro", borderBottom:"1px solid gainsboro", padding: "5px 20px"}}>Page Visits: {visitCounter}</p>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New_Playlist;