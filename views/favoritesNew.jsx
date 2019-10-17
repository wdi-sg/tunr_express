var React = require('react');
class AddSongsToFavorite extends React.Component {
  render() {

    const Navbar = require("./navbar.jsx");

    let songs = this.props.songs.map(x=>{
        let title = x.title;
        let id = x.id;
        let album = x.album;
        let artwork = x.artwork;

        return <option value={id}>{title}</option>
    });


    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
        <Navbar/>

        <main>
          <div>
            <h1 className="col-md-auto display-4">Favorite these songs to {this.props.username}'s account</h1>
            <form method='POST' action={'/favorites'} className="forms">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Song Titles</label>
                <select name="song_id" class="form-control" id="exampleFormControlSelect1">
                    {songs}
                </select>
              </div>
              <button type="submit" class="btn btn-dark">Add This Song</button>
            </form>
          </div>
        </main>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = AddSongsToFavorite;