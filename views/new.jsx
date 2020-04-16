var React = require("react");

class New extends React.Component {
  render() {

    const artist = this.props.artistData

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h3>Creating A New Artist</h3>
          <form action="/artists" method="post">
            <input name="name" placeholder="Artist Name" />
            <input name="photo_url" placeholder="Image URL" />
            <input name="nationality" placeholder="Nationality" />
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
