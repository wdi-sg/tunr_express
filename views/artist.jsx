var React = require('react');

class Artistpage extends React.Component {
  render() {

    let editurl = "/artists/" + this.props.rows[0].id + "/edit";
    let deleteurl = "/artists/" + this.props.rows[0].id + "/delete";

    return (
      <html>
      <head>
        <title>{this.props.rows[0].name}</title>
        <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
            <h1 className="solo-artist">{this.props.rows[0].name}</h1>
        </header>
        <body>
            <img className="solo-artist" src={this.props.rows[0].photo_url}/>
            <p className="solo-artist">Nationality: {this.props.rows[0].nationality}</p>

            <form action={editurl} method="GET">
                <input type="submit" value="Edit Artist"/>
            </form>

            <form action={deleteurl} method="GET">
                <input type="submit" value="Delete Artist"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Artistpage;