var React = require("react");

class Newplaylist extends React.Component {
  render() {
    return (
      <html>
<head>
<title>🎵Add Playlist</title>
          <meta charset="utf-8" />
</head>


        <body>
          <h3>Add a New Playlist</h3>

        <div >
             <form method="POST" action='/playlist'>
                Name  <textarea type="text" name="name"/><br/>
                <input type="submit" value="Add playlist here 🎵" />
            </form>
        </div>

        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;
