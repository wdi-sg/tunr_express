var React = require("react");

class Newartist extends React.Component {
  render() {
    return (
      <html>
        <head>
        <title>Create New Artist</title>
        <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
            <h1>Create New Artist</h1>
        </header>
        <body>
          <div className = "create-artist">
                <form action="/artist "method="POST" className = "form-container">
                    <h2>Name</h2>
                    <input type="text" name="name"/>

                    <h2>Image Source</h2>
                    <input type="text" name="photo_url"/>

                    <h2>Nationality</h2>
                    <input type="text" name="nationality"/>
                    <br/>
                    <input type="submit"/>
                </form>
              </div>
        </body>
      </html>
    );
  }
}

module.exports = Newartist;