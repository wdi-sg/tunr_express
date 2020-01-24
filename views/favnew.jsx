var React = require("react");

class Favnew extends React.Component {
  render() {
    return (
      <html>
<head>
<title>🎵Add Artist</title>
          <meta charSet="utf-8" />
</head>


        <body>
          <h3>Place your favourite artist in a "favourite" tab</h3>

        <div >
             <form method="POST" action='/artists'>
                Artist Id  <textarea type="text" name="id"/>
                <input type="submit" value="Favourite artist here 🎵" />
            </form>
        </div>

        </body>
      </html>
    );
  }
}

module.exports = Favnew;
