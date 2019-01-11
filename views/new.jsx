var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method='POST' action='/artist/songs/new'>
            <legend>CREATE NEW SONG</legend>
            <label>title</label><br/>
            <input type="text" placeholder="title"></input><br/>
            <label>title</label><br/>
            <input type="text" placeholder="title"></input><br/>
            <label>title</label><br/>
            <input type="text" placeholder="title"></input><br/>
            <label>title</label><br/>
            <input type="text" placeholder="title"></input><br/>
            <input type="submit" value="CREATE NEW SONG"></input>
            
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
