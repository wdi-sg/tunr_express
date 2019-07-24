var React = require("react");

class Newsong extends React.Component {
  render() {
    let url = "artists/" + this.props.rows[0].id;
    return (
      <html>
        <head>
        <title>Add New Song</title>
        <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
            <h1>Add New Song for {this.props.rows[0].name}</h1>
        </header>
        <body>
          <div className = "create-song">
                <form action={url} method="POST" className = "form-container">
                    <h2>Song Title</h2>
                    <input type="text" name="title"/>

                    <h2>Song Album</h2>
                    <input type="text" name="album"/>

                    <h2>Song Preview</h2>
                    <input type="text" name="preview_link"/>

                    <h2>Artwork</h2>
                    <input type="text" name="artwork"/>

                    <h2>Artist Id</h2>
                    <input type="text" name="artist_id" defaultValue={this.props.rows[0].id} readOnly/>
                    <br/>
                    <input type="submit"/>
                </form>
              </div>
        </body>
      </html>
    );
  }
}

module.exports = Newsong;