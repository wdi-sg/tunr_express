var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
<head>
<title>🎵Add Artist</title>
          <meta charset="utf-8" />
</head>


        <body>
          <h3>Add a New Artist</h3>

        <div >
             <form method="POST" action='/artists'>
                Name  <textarea type="text" name="name"/><br/>
                Photo URL  <textarea type="text" name="photo_url"/><br/>
                Nationality  <textarea type="text" name="nationality"/><br/>
                <input type="submit" value="Add artist here 🎵" />
            </form>
        </div>

        </body>
      </html>
    );
  }
}

module.exports = New;
