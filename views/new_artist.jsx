var React = require("react");

class New_Artist extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>New Artist</h1>
                <br/>
                <form method='POST' action='/artists'>
                    <div className='row justify-content-center'>
                        <p>Name <input type='text' name='name' placeholder='Enter name'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Photo <input type='text' name='photo_url' placeholder='Enter URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Nationality <input type='text' name='nationality' placeholder='Enter nationality'/>
                        </p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New_Artist;