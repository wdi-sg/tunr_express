var React = require("react");

class NewArtist extends React.Component {
  render(){


return (
    <html>
    <head>
        <link rel={"stylesheet"} href={`/style.css`} />
    </head>
        <body>
          <h1>Create New Artist</h1>
            <form method="POST" action="/newartist">

                <p>Artist's Photo URL</p>
                <input photo_url="photo_url"/>

                <p>Artist Name</p>
                <input name="name"/>

                <p>Nationality</p>
                <input nationality="nationality"/>

                <br/>

                <input type="submit"/>
            </form>
        </body>
    </html>
        );
    }
};

module.exports = NewArtist;