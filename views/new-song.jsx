var React = require("react");

class NewSong extends React.Component {
    render() {
        var currentArtist = this.props.id;

        // console.log(currentArtist); //yields: "/js" (where snippets run)

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                </head>
                <body className="bg-secondary">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/artists">Tunr Express</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/artists">Artists <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="/playlists">Playlists</a>
              </div>
            </div>
          </nav>
                    <div className="container-fluid">
                        <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Add New Song</u></em></h1>
                        <div className="container w-75 ml-auto mr-auto pl-0 pr-0">
                            <br />
                            <form className="card bg-light pl-5 pr-5 pt-5 pb-5" method="POST" action={`/artists/songs`}>
                                Title:&emsp;
                        <input type="text" name="title" placeholder="title" />
                                <br /><br />

                        Album:&emsp;
                        <input type="text" name="album" placeholder="album" />
                                <br /><br />

                        Preview_Link:&emsp;
                        <input type="text" name="preview_link" placeholder="preview_link" />
                                <br /><br />
                        Artwork&emsp;
                        <input type="text" name="artwork" placeholder="artwork" />
                                <br /><br />
                        Artist_Id&emsp;
                        <input type="text" name="artist_id" defaultValue={currentArtist} />
                                <br /><br />
                                <button className="btn btn-success w-50 ml-auto mr-auto" type="submit"> Submit </button>
                                <br />

                            </form>



                        </div>
                    </div>


                </body>
            </html>
        );
    }
}

module.exports = NewSong;
